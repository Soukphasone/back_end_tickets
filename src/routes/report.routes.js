const controller = require("../controllers/report.controller");

module.exports = async (app) => {
  app.get("/report", controller.reportCountCarType);
  app.get("/report/amount", controller.reportAmountMoney);

  app.get("/report/orderAllStatus", controller.reportAllStatus);
  app.get("/report/orderByStatus", controller.reportByStatus);
};
