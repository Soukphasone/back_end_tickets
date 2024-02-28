const mongoose = require("./mongoose");
const Schema = mongoose.Schema;

const store = mongoose.db.model(
  "store",
  new mongoose.Schema({
    name: {
      type: String,
    },
    phone: {
      type: String,
    },
    packageName: {
      type: String,
    },
    packageId: {
      type: Schema.Types.ObjectId,
      ref: "package",
    },
    status: {
      type: String,
      enum: ["Active", "Block"],
      default: "Active",
    },
    active: {
      type: Date,
    },

    start: {
      type: Date,
      default: Date.now,
    },
    expire: {
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

module.exports = store;
