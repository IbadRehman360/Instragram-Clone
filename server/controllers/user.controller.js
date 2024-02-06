
const Post = require("../models/post.model");
const User = require("../models/user.model");

exports.user = (req, res) => {
    User.findOne({ _id: req.params.id })
        .select("-Password")
        .then((user) => {
            Post.find({ PostedBy: req.params.id })
                .populate("PostedBy", "_id Name")
                .exec((err, result) => {
                    if (err) return res.status(422).json();
                    const posts = [];
                    result.map((item) => {
                        posts.push({
                            _id: item._id,
                            Title: item.Title,
                            Body: item.Body,
                            Photo: item.Photo.toString("base64"),
                            PhotoType: item.PhotoType,
                            Likes: item.Likes,
                            Comments: item.Comments,
                            Followers: item.Followers,
                            Following: item.Following,
                        });
                    });
                    res.json({ user, posts });
                });
        })
        .catch((err) => {
            return res.status(404).json({ Error: "User not found" });
        });
};

exports.allUser = (req, res) => {
    User.find()
        .select("-Password")
        .then((users) => {
            const userIds = users.map(user => user._id);

            Post.find({ PostedBy: { $in: userIds } })
                .populate("PostedBy", "_id Name")
                .exec((err, result) => {
                    if (err) {
                        return res.status(422).json({ error: err });
                    }

                    const posts = result.map(item => ({
                        _id: item._id,
                        Title: item.Title,
                        Body: item.Body,
                        Photo: item.Photo.toString("base64"),
                        PhotoType: item.PhotoType,
                        Likes: item.Likes,
                        Comments: item.Comments,
                        Followers: item.Followers,
                        Following: item.Following,
                    }));

                    res.json({ users, posts });
                });
        })
        .catch((err) => {
            return res.status(404).json({ Error: "Users not found", error: err });
        });
};
exports.follow = async (req, res) => {
    const { user_id, postedUserId } = req.body;
    console.log("Following")

    try {
        const follower = await User.findById(user_id);
        const followingUser = await User.findById(postedUserId);

        if (!follower || !followingUser) {
            return res.status(404).json({ error: "User not found" });
        }


        const updatedFollower = await User.findByIdAndUpdate(
            user_id,
            { $push: { Following: postedUserId } },
            { new: true }
        );

        const updatedFollowingUser = await User.findByIdAndUpdate(
            postedUserId,
            { $push: { Followers: user_id } },
            { new: true }
        ).select("-Password");

        res.json({ follower: updatedFollower, followingUser: updatedFollowingUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.unfollow = async (req, res) => {
    const { user_id, postedUserId } = req.body;
    console.log("Unfollowing", user_id)
    try {
        const updateUser = await User.findByIdAndUpdate(
            user_id,
            { $pull: { Following: postedUserId } },
            { new: true }
        );

        const updateUnfollowedUser = await User.findByIdAndUpdate(
            postedUserId,
            { $pull: { Followers: user_id } },
            { new: true }
        ).select("-Password");

        res.json({ user: updateUser, unfollowedUser: updateUnfollowedUser });
    } catch (err) {
        console.error(err);
        throw new Error("Internal Server Error");
    }
};
exports.updatePicture = (req, res) => {
    User.findByIdAndUpdate(
        req.user._id,
        { $set: { Photo: req.body.Photo, PhotoType: req.body.PhotoType } },
        { new: true },
        (err, result) => {
            if (err) {
                return res.status(422).json({ error: "pic canot post" });
            }
            res.json(result);
        }
    );
};

exports.userSearch = (req, res) => {
    let pattern = new RegExp("^" + req.body.pattern);
    User.find({ Email: { $regex: pattern } })
        .select("_id Email Name")
        .then((user) => {
            res.json({ user });
        })
        .catch((err) => {
            console.log(err);
        });
};
