const mongoose = require("./mongoose");
const Schema = mongoose.Schema;

const package = mongoose.db.model(
  "package",
  new mongoose.Schema({
    name: {
      type: String,
    },
    description: String,
    price: Number,
    duration_day: Number,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    createBy: {
      type: Schema.Types.ObjectId,
    },
    updatedAt: Date,
    updatedBy: {
      type: Schema.Types.ObjectId,
    },
  })
);

module.exports = package;
