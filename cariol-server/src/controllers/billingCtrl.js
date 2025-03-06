const { Billing } = require('../models/Billing')
const { billingValidator } = require('../validation/billingValid')


// const multer = require('multer')

// const { upload } = require('../multer')


module.exports = {
    getAll: async (req, res) => {
        try {

            const data = await Billing.find({}).populate("accountId")

            if (!data) {
                res.status(404).json({ message: "Không tìm thấy Billing nào cả !" })
            }
            res.status(200).json({
                message: "Tìm thấy Billing rồi !",
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
            const data = await Billing.findById(req.params.id)
            if (!data) {
                res.status(404).json({ message: "Không tìm thấy Bill nào cả !" })
            }
            res.status(200).json({
                message: "Tìm thấy Bill sau !",
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

            const { error } = billingValidator.validate(req.body)

            if (error) {
                return res.status(400).json({
                    message: error.details[0].message
                })
            }

            const data = await Billing.create({
                ...req.body,
            })

            if (!data) {
                res.status(404).json({ message: "Tạo Bill không thành công" })
            }

            return res.status(200).json({
                message: "Tạo Bill thành công",
                data: data
            })
        } catch (error) {
            res.status(500).json({
                name : "lỗi ngoài",
                message: error.message,
            })
        }
    },

    update: async (req, res) => {
        try {

            // const { error } = billingValidator.validate(req.body, { abortEarly: false })
            // if (error) {
            //     return res.status(400).json({
            //         message: error.details[0].message
            //     })
            // }

            const data = await Billing.findByIdAndUpdate(req.params.id, {
                ...req.body,
            }, {
                new: true,
            })

            if (!data) {
                res.status(404).json({ message: "Sửa Bill không thành công" })
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
            const data = await Billing.findByIdAndDelete(req.params.id)
            if (!data) {
                return res.status(400).json({
                    message: "Không tìm thấy Bill"
                })
            }
            return res.status(200).json({
                message: "Xóa Bill thành công",
                data: data
            })
        } catch (error) {
            res.status(500).json({
                message: error,
            })
        }
    }
}