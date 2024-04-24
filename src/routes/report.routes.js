const controller = require("../controllers/report.controller");
module.exports = async (app) => {
  app.get("/report", controller.reportCountCarType);
  app.get("/report/countcartoday", controller.reportCountCarTypeToday);
  app.get("/report/cancelbill", controller.Cancelbill);
  app.get("/report/amounttoday", controller.ReportAmoutDay);
};
