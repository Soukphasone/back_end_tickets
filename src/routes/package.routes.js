const controller = require("../controllers/package.controller");
// const { verifyToken } = require("../middlewares");

module.exports = async (app) => {
  app.get("/packages", controller.packages);
  app.post("/package", controller.packageCreate);
  app.get("/package/:id", controller.package);
  app.put("/package/:id", controller.packageUpdate);
  app.delete("/package/:id", controller.packageDelete);
};
