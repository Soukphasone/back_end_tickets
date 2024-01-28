const mongoose = require("./mongoose");
const Schema = mongoose.Schema;

const user = mongoose.db.model(
  "user",
  new mongoose.Schema({
    name: String,
    // username: {
    //   type: String,
    //   require: true,
    //   unique: true,
    // },
    username: String,
    password: String,
    status: {
      type: String,
      enum: ["ACTIVE", "BLOCKED"],
      default: "ACTIVE",
    },
    role: {
      type: String,
      enum: ["ADMIN", "STORE", "STAFF", "USER"],
      default: "USER",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    updatedAt : Date,
    updatedBy: {
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

module.exports = user;
