

const controller = require("../controllers/post.controller");
const loginmiddleware = require("../middleware/login.middleware");

module.exports = (app) => {
    app.get("/allpost", loginmiddleware, controller.allPost);

    app.post("/createpost", loginmiddleware, controller.createPost);

    app.put("/toggleLike", loginmiddleware, controller.toggleLike);

    app.put("/comment", loginmiddleware, controller.comment);

    app.delete("/deletepost/:postId", loginmiddleware, controller.deletePost);
};
