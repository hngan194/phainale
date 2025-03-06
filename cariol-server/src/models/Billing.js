const mongoose = require('mongoose');

const Schema = mongoose.Schema

const billingSchema = new Schema({
    orderId: {
        type : Schema.Types.ObjectId,
        ref : 'Order',
        required: true,
    },
    accountId: {
        type : Schema.Types.ObjectId,
        ref : 'Account',
        required: true,
    },
    totalPrice: {
        type: Number,
        defaultValue: 0,
        required: true,
    },
    method: {
        type: String,
        required: true,
    },
    status : {
        type: String,
        default: 'pending'
    },
},
{
    versionKey: false,
    timestamps: true,
})

const Billing = mongoose.model('Billing', billingSchema)

module.exports = {Billing}