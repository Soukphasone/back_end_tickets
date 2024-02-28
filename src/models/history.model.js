const mongoose = require("./mongoose");
const Schema = mongoose.Schema;

const history = mongoose.db.model(
  "history",
  new mongoose.Schema({
    duration_day: Number,
    price: Number,
    storeId: {
      type: Schema.Types.ObjectId,
      ref: "store",
    },
    packageId: {
      type: Schema.Types.ObjectId,
      ref: "package",
    },
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

module.exports = history;
