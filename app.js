const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();
const server = http.createServer(app);

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
// populate
app.use((req, res, next) => {
  const _populate = req.query.p || "";
  const _p = _populate.split("||");
  var _poppulates = _p[0];
  for (let i = 1; i < _p.length; i++) {
    _poppulates += " " + _p[i];
  }
  req.populate = _poppulates || "";
  delete req.query.p;
  next();
});
// routes
require("./src/routes/auth.routes")(app);
require("./src/routes/order.routes")(app);
require("./src/routes/report.routes")(app);
require("./src/routes/user.routes")(app);


const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log("SEVER_IS_RUNNING_ON_PORT:", port);
});
