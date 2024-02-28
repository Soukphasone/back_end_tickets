const controller = require("../controllers/uploadFile.controller");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
module.exports = async (app) => {
  app.post("/uploadfile", upload.single("csv"), controller.CreateFile);
};
