const db = require("../models");
const Uploadfile = db.store;
const csv = require("csv-parser");
const fs = require("fs");

exports.CreateFile = async (req, res) => {
  const results = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      Uploadfile.insertMany(results, (err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error saving to database");
        } else {
          // Delete the CSV file after successfully saving to the database
          fs.unlink(req.file.path, (err) => {
            if (err) {
              console.error(err);
              res.status(500).send("Error deleting file");
            } else {
              res.send("CSV uploaded and saved to database");
            }
          });
        }
      });
    });
};
