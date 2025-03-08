
const { Category } = require('../models/Category');
const { Product } = require('../models/Product')
const productValidator = require('../validation/productValid')


const multer = require('multer')

const { upload } = require('../multer')


module.exports = {
    getAll: async (req, res) => {
        try {

            const {
                _page = 1,
                _limit = 10,
                _sort = "createdAt",
                _order = "asc",
            } = req.query

            const options = {
                page: _page,
                limit: _limit,
                sort: {
                    [_sort]: _order === "asc" ? 1 : -1
                }
            }

            // const productList = await Product.find({}).populate("categoryId")

            const productList = await Product.paginate({}, options)

            if (!productList.docs || productList.docs.length === 0) {
                res.status(404).json({ message: "Không tìm thấy sản phẩm" })
            }
            res.status(200).json({
                message: "Tìm thấy sản phẩm",
                data: productList
            })
        } catch (error) {
            res.status(500).json({
                message: error,
            })
        }
    },

    getDetail: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id)
            if (!product) {
                res.status(404).json({ message: "Không tìm thấy sản phẩm" })
            }
            res.status(200).json({
                message: "Tìm thấy sản phẩm",
                data: product
            })
        } catch (error) {
            res.status(500).json({
                message: error,
            })
        }
    },

    // create: async (req, res) => {
    //     try {



    //         const { error } = productValidator.validate(req.body)
    //         if (error) {
    //             return res.status(400).json({
    //                 message: error.details[0].message
    //             })
    //         }
    //         const product = await Product.create(req.body)
    //         if (!product) {
    //             res.status(404).json({ message: "Tạo không thành công" })
    //         }

    //         const updateCategory = await Category.findByIdAndUpdate(product.categoryId, {
    //             $addToSet: {
    //                 Product: product._id
    //             }
    //         })

    //         if (!updateCategory) {
    //             return res.status(404).json({
    //                 message: "Update Category Thất Bại"
    //             })
    //         }

    //         return res.status(200).json({
    //             message: "Tạo sản phẩm thành công",
    //             data: product
    //         })

    //     } catch (error) {
    //         res.status(500).json({
    //             message: error,
    //         })
    //     }
    // },
    create: async (req, res) => {
        try {
            // upload(req, res, async (err) => {
            //     if (err instanceof multer.MulterError) {
            //         return res.status(400).json({ message: "Lỗi khi tải lên hình ảnh" })
            //     } else if (err) {
            //         return res.status(500).json({ message: "Lỗi server khi tải lên hình ảnh" })
            //     }

                const { error } = productValidator.validate(req.body)

                if (error) {
                    return res.status(400).json({
                        message: error.details[0].message
                    })
                }

                const product = await Product.create({
                    ...req.body,
                })

                if (!product) {
                    res.status(404).json({ message: "Tạo không thành công" })
                }

                const updateCategory = await Category.findByIdAndUpdate(product.categoryId, {
                    $addToSet: {
                        Product: product._id
                    }
                })

                if (!updateCategory) {
                    return res.status(404).json({
                        message: "Update Category Thất Bại"
                    })
                }

                return res.status(200).json({
                    message: "Tạo sản phẩm thành công",
                    data: product
                })
            // })
        } catch (error) {
            res.status(500).json({
                message: error,
            })
        }
    },

    update: async (req, res) => {
        try {

            // upload(req, res, async (err) => {
            //     if (err instanceof multer.MulterError) {
            //         return res.status(400).json({ message: "Lỗi khi tải lên hình ảnh" })
            //     } else if (err) {
            //         return res.status(500).json({ message: "Lỗi server khi tải lên hình ảnh" })
            //     }

                const { error } = productValidator.validate(req.body, { abortEarly: false })
                if (error) {
                    return res.status(400).json({
                        message: error.details[0].message
                    })
                }

                const product = await Product.findByIdAndUpdate(req.params.id, {
                    ...req.body,
                }, {
                    new: true,
                })

                if (!product) {
                    res.status(404).json({ message: "Sửa không thành công" })
                }

                return res.status(200).json({
                    message: "Sửa thành công",
                    data: product
                })
            // })
        } catch (error) {
            res.status(500).json({
                message: error.message,
            })
        }
    },

    remove: async (req, res) => {
        try {
            const data = await Product.findByIdAndDelete(req.params.id)
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
    },

    getListByCategory: async (req, res) => {
        try {

            const {
                _page = 1,
                _limit = 10,
                _sort = "createdAt",
                _order = "asc",
            } = req.query

            const options = {
                page: _page,
                limit: _limit,
                sort: {
                    [_sort]: _order === "asc" ? 1 : -1
                }
            }

            const data = await Product.paginate({ categoryId: req.params.categoryId }, options)


            if (!data) {
                return res.status(400).json({
                    message: "Không tìm thấy sản phẩm"
                })

            }

            return res.status(200).json({
                message: "Tìm thấy sản phẩm",
                data: data
            })
        } catch (error) {
            return res.status(500).json({
                name: error.name,
                message: error,
            })
        }
    }
}