const mongoose = require("./mongoose");
const Schema = mongoose.Schema;

const store = mongoose.db.model(
  "product",
  new mongoose.Schema({
    images: [String],
    name: {
      type: String,
      require: true,
    },
    type: {
      type: Schema.Types.ObjectId,
      ref: "product_type",
    },
    detail: String,
    price: Number,
    priceDiscount: Number,
    status: {
      type: String,
      enum: ["INSTOCK", "PRE_ORDER","OUT_ORDER"],
      default: "INSTOCK",
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
