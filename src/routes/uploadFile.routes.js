const controller = require("../controllers/uploadFile.controller");

module.exports = async (app) => {
    app.post("/uploadfile", controller.getSingedUrl);
    app.post("/uploadfile-many", controller.getSingedUrlMany);
};
