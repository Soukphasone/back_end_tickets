const mongoose = require("./mongoose");
const Schema = mongoose.Schema;

const store = mongoose.db.model(
  "order",
  new mongoose.Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    sign: String,
    carType: String,
    money: String,
    amount: Number,
    note: String,
    status: {
      type: String,
      enum: ["ONLINE", "OFFLINE"],
      default: "ONLINE",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    createdOut: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    updatedAt: Date,
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    }
  })
);

module.exports = store;
