const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

var postSchema = mongoose.Schema(
    {
        Title: {
            type: String,
            required: true,
        },
        Body: {
            type: String,
            required: true,
        },
        Photo: {
            type: Buffer,
            default: null,
        },
        PhotoType: {
            type: String,
        },
        PostedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        Likes: [{ type: ObjectId, ref: "User" }],
        Comments: [
            {
                Text: String,
                PostedBy: {
                    type: ObjectId,
                    ref: "User",
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        postCreatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
