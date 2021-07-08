const { Schema, model } = require("mongoose");

const UserSchema = new Schema({

    userId: Number,
    name: String,
    noOfOrders: {
        type: Number,
        default: 0
    }

})

module.exports = model('User', UserSchema)