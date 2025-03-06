const mongoose = require('mongoose');

const Schema = mongoose.Schema

const orderSchema = new Schema({
    accountId: {
        type : Schema.Types.ObjectId,
        ref : 'Account',
        required: true,
    },
    products : [{
        productId : {
            type : Schema.Types.ObjectId,
            ref : 'Product',
            required: true,
        },
        amount : {
            type: Number,
            required: true,
        },
}],
    totalPrice: {
        type: Number,
        defaultValue: 0,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    status : {
        type: String,
        default: 'pending',
        required: true,
    },
},
{
    versionKey: false,
    timestamps: true,
})

const Order = mongoose.model('Order', orderSchema)

module.exports = {Order}