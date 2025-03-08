// /cariol-server/models/blog.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    image_url: {   // Thêm trường để lưu URL của hình ảnh từ Cloudinary
        type: String,
    },
    image_public_id: {  // Thêm trường để lưu public_id từ Cloudinary
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
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);

module.exports = { Blog };
