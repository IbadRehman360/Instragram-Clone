
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    Username: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    },

    ResetToken: { type: String },
    ExpirationToken: { type: Date },
    Photo: {
        type: Buffer,
    },
    PhotoType: {
        type: String,
    },
    Followers: [{ type: ObjectId, ref: "User" }],
    Following: [{ type: ObjectId, ref: "User" }],
    Bookmarks: [{ type: ObjectId, ref: "Post" }],
});

module.exports = mongoose.model("User", userSchema);
