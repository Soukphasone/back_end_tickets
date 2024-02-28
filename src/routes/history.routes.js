const controller = require("../controllers/history.controller");

module.exports = async (app) => {
  app.get("/history", controller.historys);
  app.get("/history/:id", controller.history);
  app.post("/buypackage", controller.historyCreate);
  app.put("/history/:id", controller.historyUpdate);
  app.delete("/history/:id", controller.historyDelete);
};
