const { Blog } = require('../models/Blog')
const { blogValidator } = require('../validation/blogValid')


// const multer = require('multer')

// const { upload } = require('../multer')


module.exports = {
    getAll: async (req, res) => {
        try {

            const blogList = await Blog.find({})

            if (!blogList) {
                res.status(404).json({ message: "Không tìm thấy Blog nào cả !" })
            }
            res.status(200).json({
                message: "Tìm thấy Blog rồi !",
                data: blogList
            })
        } catch (error) {
            res.status(500).json({
                name : error.name,
                message: error,
            })
        }
    },

    getDetail: async (req, res) => {
        try {
            const blog = await Blog.findById(req.params.id)
            if (!blog) {
                res.status(404).json({ message: "Không tìm thấy Blog nào cả !" })
            }
            res.status(200).json({
                message: "Tìm thấy Blog !",
                data: blog
            })
        } catch (error) {
            res.status(500).json({
                message: error,
            })
        }
    },
    create: async (req, res) => {
        try {
            const { error } = blogValidator.validate(req.body)

            if (error) {
                return res.status(400).json({
                    message: error.details[0].message
                })
            }

            const blog = await Blog.create({
                ...req.body,
            })

            if (!blog) {
                res.status(404).json({ message: "Tạo Blog không thành công" })
            }

            return res.status(200).json({
                message: "Tạo Blog thành công",
                data: blog
            })
        } catch (error) {
            res.status(500).json({
                message: error,
            })
        }
    },

    update: async (req, res) => {
        try {
            // const { error } = blogValidator.validate(req.body, { abortEarly: false })

            // if (error) {
            //     return res.status(400).json({
            //         message: error.details[0].message
            //     })
            // }

            const blog = await Blog.findByIdAndUpdate(req.params.id, {
                ...req.body,
            }, {
                new: true,
            })

            if (!blog) {
                res.status(404).json({ message: "Sửa Blog không thành công" })
            }

            return res.status(200).json({
                message: "Sửa thành công",
                data: blog
            })

        } catch (error) {
            res.status(500).json({
                message: error.message,
            })
        }
    },

    remove: async (req, res) => {
        try {
            const data = await Blog.findByIdAndDelete(req.params.id)
            if (!data) {
                return res.status(400).json({
                    message: "Không tìm thấy sản phẩm"
                })
            }
            return res.status(200).json({
                message: "Xóa sản phẩm thành công",
                data: data
            })
        } catch (error) {
            res.status(500).json({
                message: error,
            })
        }
    }
}