const mongoose = require("./mongoose");

const user = require("./user.model");
// const productType = require("./productType.model");
const product = require("./product.model");
const bill = require("./bill.model");
const order = require("./order.model");
const customer = require("./customer.model");
const db = {};
db.mongoose = mongoose;
db.user = user;
// db.productType = productType;
db.product = product;
db.bill = bill;
db.order = order;
db.customer = customer;
module.exports = db;
