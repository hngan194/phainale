const mongoose = require('mongoose');

const Schema = mongoose.Schema

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    content: {
        type: String,
        required: true,
    },
    accountId: {
        type : Schema.Types.ObjectId,
        ref : 'Account',
        required: true,
    },
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = {Blog}