const { Schema, model } = require("mongoose");

const OrderSchema = new Schema({

    orderId: Number,
    userId: Number,
    subTotal: Number,
    date: Date

})

module.exports = model('Order', OrderSchema)