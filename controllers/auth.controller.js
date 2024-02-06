const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");


exports.signup = async (req, res) => {
    const { username, emailAddress, password, fullName } = req.body;
    if (!username || !password || !emailAddress || !fullName) {
        return res.json({ error: "Please submit all required fields" });
    }
    try {
        const savedUser = await User.findOne({ Email: emailAddress });
        if (savedUser) {
            return res.json({ error: "User Already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({
            Name: fullName,
            Username: username,
            Email: emailAddress,
            Password: hashedPassword,
        });

        await user.save();

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

        res.json({
            message: "Saved successfully",
            token: token,
            _id: user._id,
            userData: {
                _id: user._id,
                fullName: fullName,
                username: username,
                emailAddress: emailAddress,
                Followers: user.Followers,
                Following: user.Following,
                Bookmarks: user.Bookmarks,
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


exports.signin = async (req, res) => {
    try {
        const { emailAddress, password } = req.body;
        console.log(emailAddress, password)
        if (!emailAddress || !password) {
            return res.json({ error: "Please provide Email or Password" });
        }

        const savedUser = await User.findOne({ Email: emailAddress });

        if (!savedUser) {
            return res.json({ error: "Invalid Email or Password" });
        }

        const doMatch = await bcrypt.compare(password, savedUser.Password);

        if (doMatch) {
            const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET);

            const { _id, Name, Email, Username, Followers, Following, Bookmarks } = savedUser;
            console.log(savedUser)
            return res.json({
                token: token,
                userData: {
                    fullName: Name,
                    emailAddress: Email,
                    username: Username,
                    Followers: Followers,
                    Following: Following,
                    Bookmarks: Bookmarks,
                    _id: _id,
                }
            });
        } else {
            return res.json({ error: "Invalid Email or Password" });
        }
    } catch (err) {
        console.error("Error during sign-in:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
