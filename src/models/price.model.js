const mongoose = require("./mongoose");
const Schema = mongoose.Schema;

const package = mongoose.db.model(
  "price",
  new mongoose.Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    carType:  String,
    amount: Number,
    note: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    createBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    updatedAt: Date,
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  })
);

module.exports = package;