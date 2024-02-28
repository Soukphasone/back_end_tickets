const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();
const server = http.createServer(app);

// cron jobs
var cron = require("node-cron");
const { Off_store } = require("./src/helpers/cron_jobs");

cron.schedule("* 23 * * *", () => {
  Off_store();
  // console.log("running a task every minute");
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, Content-Type, Accept"
  );
  next();
});
// routes
require("./src/routes/uploadFile.routes")(app);
require("./src/routes/store.routes")(app);
require("./src/routes/history.routes")(app);
require("./src/routes/package.routes")(app);
const port = process.env.PORT || 9100;
server.listen(port, () => {
  console.log("SEVER_IS_RUNNING_ON_PORT:", port);
});
