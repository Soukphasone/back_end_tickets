const controller = require("../controllers/price.controller");
const { verifyToken } = require("../middlewares");

module.exports = async (app) => {
  app.get("/prices", controller.prices);
  app.get("/price/:id", controller.price);
  app.post("/price", verifyToken, controller.priceCreate);
  app.put("/price/:id", verifyToken, controller.priceUpdate);
  app.delete("/price/:id", verifyToken, controller.pricerDelete);
};