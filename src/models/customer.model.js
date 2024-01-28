const mongoose = require("./mongoose");
const Schema = mongoose.Schema;

const customer = mongoose.db.model(
    "customer",
    new mongoose.Schema({
        fullname: String,
        phone: String,
        address: String,
        order: [{
            productId: {
                type: Schema.Types.ObjectId,
                ref: "product",
            },
            images: String,
            price: Number,
            name: String,
            qty: Number,
            status: String,
            totalPrice:Number
        }],
        createdAt: {
            type: Date,
            default: Date.now,
        },
      
        updatedAt: Date,
     
    })
);

module.exports = customer;
