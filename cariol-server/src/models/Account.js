const mongoose = require('mongoose');

const Schema = mongoose.Schema

const accountSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber : {
        type: String,
        required: true,
    },
    role : {
        type: String,
        default: 'member',
    },
    image : {
        type: String,
    },
    address : {
        type: String
    },
    city : {
        type: String,
    },
    state : {
        type: String
    },
    country : {
        type: String
    },
    totalOrder : {
        type: Number,
        default: 0
    },
    status : {
        type: String,
        default: 'active'
    },
    // cartId : {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Cart',
    //     unique: true,
    // },
},
{
    versionKey: false,
    timestamps: true,
})

const Account = mongoose.model('Account', accountSchema)

module.exports = { Account }