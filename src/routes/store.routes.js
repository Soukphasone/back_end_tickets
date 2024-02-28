const controller = require("../controllers/store.controller");
// const { verifyToken } = require("../middlewares");

module.exports = async (app) => {
  app.get("/stores", controller.stores);
  app.get("/store/:id", controller.store);
  app.post("/store", controller.storeCreate);
  app.put("/store/:id", controller.storeUpdate);
  app.delete("/store/:id", controller.storeDelete);
};
