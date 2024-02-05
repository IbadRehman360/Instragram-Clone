
const loginmiddleware = require("../middleware/login.middleware");
const controller = require("../controllers/user.controller");

module.exports = (app) => {
    app.get("/user/:id", loginmiddleware, controller.user);

    app.put("/follow", loginmiddleware, controller.follow);

    app.put("/unfollow", loginmiddleware, controller.unfollow);

    app.put("/update-picture", loginmiddleware, controller.updatePicture);

    app.post("/users-research", controller.userSearch);
};
