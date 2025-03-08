const mongoose = require('mongoose')

const Schema = mongoose.Schema


const catSchema = new Schema({
    name : {
        type : String,
        required : true,
        unique : true,
    },
    slug : {
        type : String,
        required : true,
    }
})

const Category = mongoose.model('Category', catSchema)

module.exports = {Category}