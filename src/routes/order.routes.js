const controller = require("../controllers/order.controller");
const { verifyToken } = require("../middlewares");

module.exports = async (app) => {
  app.get("/orders", controller.orders);
  app.get("/order/:id", controller.order);
  app.post("/order", verifyToken, controller.orderCreate);
  app.put("/order/:id", verifyToken, controller.orderUpdate);
  app.delete("/order/:id", verifyToken, controller.orderDelete);
};
