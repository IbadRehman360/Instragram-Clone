const savePhoto = (post, fileName, fileType) => {
    if (fileName != null) {
        post.Photo = new Buffer.from(fileName, "base64");
        post.PhotoType = fileType;
    }
};

module.exports = { savePhoto };