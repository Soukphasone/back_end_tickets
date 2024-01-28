const controller = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares");

module.exports = async (app) => {
  app.get("/users", verifyToken, controller.users);
  app.post("/users", verifyToken, controller.userCreate);
  app.get("/user/:id", verifyToken, controller.user);
  app.put("/users/:id", verifyToken, controller.userUpdate);
  app.delete("/users/:id", verifyToken, controller.userDelete);
  app.post("/invite-create-user", verifyToken, controller.inviteCreateStore);
};



