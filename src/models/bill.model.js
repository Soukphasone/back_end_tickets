const mongoose = require("./mongoose");
const Schema = mongoose.Schema;

const store = mongoose.db.model(
  "bill",
  new mongoose.Schema({
    order: [
      {
        type: Schema.Types.ObjectId,
        ref: "order",
      },
    ],
    sum: {
      type: String,
      default: "0",
    },
    createdAt: {
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
    },
  })
);

module.exports = store;
