const { required } = require('joi');
const mongoose = require('mongoose');
const { unit } = require('../validation/productValid');

const Schema = mongoose.Schema

const cartSchema = new Schema({
    accountId: {
        type : Schema.Types.ObjectId,
        ref : 'Account',
        required: true,
        unique: true,
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
        _id : false,
    }],
    totalPrice: {
        type: Number,
        defaultValue: 0,
        required: true,
    },
},
{
    versionKey: false,
    timestamps: true,
})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = {Cart}