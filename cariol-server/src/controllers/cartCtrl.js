const { Cart } = require('../models/Cart')
const { cartValidator } = require('../validation/cartValid')


// const multer = require('multer')

// const { upload } = require('../multer')


module.exports = {
    getAll: async (req, res) => {
        try {

            const data = await Cart.find({}).populate("accountId")

            if (!data) {
                res.status(404).json({ message: "Không tìm thấy Cart nào cả !" })
            }
            res.status(200).json({
                message: "Tìm thấy Cart rồi !",
                data: data
            })
        } catch (error) {
            res.status(500).json({
                message: error,
            })
        }
    },

    getDetail: async (req, res) => {
        try {
            const data = await Cart.findById(req.params.id)
            if (!data) {
                res.status(404).json({ message: "Không tìm thấy Cart nào cả !" })
            }
            res.status(200).json({
                message: "Tìm thấy Cart sau !",
                data: data
            })
        } catch (error) {
            res.status(500).json({
                message: error,
            })
        }
    },

    create: async (req, res) => {
        try {

            const { error } = cartValidator.validate(req.body)

            if (error) {
                return res.status(400).json({
                    message: error.details[0].message
                })
            }

            const data = await Cart.create({
                ...req.body,
            })

            if (!data) {
                res.status(404).json({ message: "Tạo Cart không thành công" })
            }

            return res.status(200).json({
                message: "Tạo Cart thành công",
                data: data
            })
        } catch (error) {
            res.status(500).json({
                message: error,
            })
        }
    },

    update: async (req, res) => {
        try {

            const { error } = cartValidator.validate(req.body, { abortEarly: false })
            if (error) {
                return res.status(400).json({
                    message: error.details[0].message
                })
            }

            const data = await Cart.findByIdAndUpdate(req.params.id, {
                ...req.body,
            }, {
                new: true,
            })

            if (!data) {
                res.status(404).json({ message: "Sửa Cart không thành công" })
            }

            return res.status(200).json({
                message: "Sửa thành công",
                data: data
            })
        } catch (error) {
            res.status(500).json({
                message: error.message,
            })
        }
    },

    remove: async (req, res) => {
        try {
            const data = await Cart.findByIdAndDelete(req.params.id)
            if (!data) {
                return res.status(400).json({
                    message: "Không tìm thấy cart"
                })
            }
            return res.status(200).json({
                message: "Xóa cart thành công",
                data: data
            })
        } catch (error) {
            res.status(500).json({
                message: error,
            })
        }
    }
}