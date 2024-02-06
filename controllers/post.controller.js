const Post = require("../models/post.model");

exports.allPost = (req, res) => {
    Post.find()
        .populate("PostedBy", "_id Name")
        .populate("Comments.PostedBy", "_id Name")
        .sort("-createdAt")
        .then((data) => {
            const posts = data.map((item) => ({
                _id: item._id,
                Title: item.Title,
                Body: item.Body,
                PostedBy: item.PostedBy,
                Photo: item.Photo ? item.Photo.toString("base64") : null,
                PhotoType: item.PhotoType,
                Likes: item.Likes,
                Comments: item.Comments,
                createdAt: item.createdAt
            }));

            res.json({ posts });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};



exports.createPost = (req, res) => {
    const { title, description, fileName, fileType, id } = req.body;

    if (!title || !description || !fileName || !fileType || !id) {
        return res.json({
            error: "Please submit all the required fields.",
        });
    }

    const post = new Post({
        Title: title,
        Body: description,
        PostedBy: id,
        PhotoType: fileType,
    });

    const decodedImage = Buffer.from(fileName, 'base64');
    post.Photo = decodedImage;

    post.save()
        .then((result) => {
            res.json({ message: "Post created successfully" });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        });
};


exports.toggleLike = async (req, res) => {
    try {
        const { docId, likerId } = req.body;
        console.log(docId, likerId)
        const post = await Post.findById(docId);
        if (!post) {
            return res.status(404).json({ Error: "Post not found" });
        }

        const userAlreadyLiked = post.Likes.includes(likerId);
        if (userAlreadyLiked) {
            await exports.unlike(post, likerId, res);
        } else {
            post.Likes.push(likerId);
            await post.save();

            const result = await Post.findById(docId)
                .populate('PostedBy', '_id username')
                .exec();

            res.json({
                _id: result._id,
                Title: result.Title,
                Body: result.Body,
                PostedBy: result.PostedBy,
                Photo: result.Photo.toString("base64"),
                PhotoType: result.PhotoType,
                Likes: result.Likes,
                Comments: result.Comments,
            });
        }
    } catch (error) {
        console.error("Error toggling like:", error);
        res.status(500).json({ Error: "Internal Server Error" });
    }
};

exports.unlike = async (post, likerId, res) => {
    try {
        post.Likes.pull(likerId);
        const result = await post.save();

        res.json({
            _id: result._id,
            Title: result.Title,
            Body: result.Body,
            PostedBy: result.PostedBy,
            Photo: result.Photo.toString("base64"),
            PhotoType: result.PhotoType,
            Likes: result.Likes,
            Comments: result.Comments,
        });
    } catch (error) {
        console.error("Error unliking post:", error);
        res.status(500).json({ Error: "Internal Server Error" });
    }
};

exports.comment = async (req, res) => {
    try {
        const { text, postId, postedBy } = req.body;

        const result = await Post.findByIdAndUpdate(
            postId,
            {
                $push: {
                    Comments: {
                        Text: text,
                        PostedBy: postedBy,
                    },
                },
            },
            { new: true }
        )
            .populate("Comments.PostedBy", "_id Name")
            .populate("PostedBy", "_id Name")
            .exec();

        if (!result) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.json({
            _id: result._id,
            Title: result.Title,
            Body: result.Body,
            PostedBy: result.PostedBy,
            Photo: result.Photo.toString("base64"),
            PhotoType: result.PhotoType,
            Likes: result.Likes,
            Comments: result.Comments,
        });
    } catch (error) {
        console.error("Error adding comment:", error);
        return res.status(500).json({ error: "Failed to add comment" });
    }
};



exports.deletePost = (req, res) => {
    const postId = req.params.postId;

    Post.findById(postId)
        .populate('PostedBy', '_id')
        .exec((err, post) => {
            if (err || !post) {
                return res.status(422).json({ error: 'Post not found' });
            }

            if (post.PostedBy._id.toString() === req.user._id.toString()) {
                post.remove()
                    .then((result) => {
                        res.json({ message: 'Post deleted successfully', deletedPostId: result._id });
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(500).json({ error: 'Internal server error' });
                    });
            } else {
                res.status(403).json({ error: 'Unauthorized access' });
            }
        });
};

