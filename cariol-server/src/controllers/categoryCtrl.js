const { Category } = require("../models/Category");
const { categoryValidator } = require("../validation/categoryValid")


module.exports = {
    getAll : async (req, res) => {
        try {
            const data = await Category.find({})

            if(!data || data.length === 0) {
                return res.status(404).json({
                    message: "No catefory"
                })
            }

            return res.status(200).json({
                message: "category here!",
                datas : data
            })

        } catch (error) {
            return res.status(500).json({
                name : error.name,
                message : error.message
            })
        }
    },

    getDetail : async (req, res) => {
        try {
            const data = await Category.findById(req.params.id)

            if(!data) {
                return res.status(404).json({
                    message: "No catefory"
                })
            }

            return res.status(200).json({
                message: "category here!",
                datas : data
            })

        } catch (error) {
            return res.status(500).json({
                name : error.name,
                message : error.message
            })
        }
    },
    
    create : async (req, res) => {
        try {
            const {error} = categoryValidator.validate(req.body, {abortEarly : false})
            if(error){
                const errors = error.details.map(err => err.message)
                return res.status(400).json({
                    message : errors
                })
            }

            const data = await Category.create(req.body)

            if(!data) {
                return res.status(404).json({
                    message: "Create Failed"
                })
            }

            return res.status(200).json({
                message: "category success",
                datas : data
            })

        } catch (error) {
            return res.status(500).json({
                name : error.name,
                message : error.message
            })
        }
    },

    update : async (req, res) => {
        try {
            const {error} = categoryValidator.validate(req.body, {abortEarly : false})
            if(error){
                const errors = error.details.map(err => err.message)
                return res.status(400).json({
                    message : errors
                })
            }


            const data = await Category.findByIdAndUpdate(req.params.id, req.body, {new : true})

            if(!data) {
                return res.status(404).json({
                    message: "Update Failed"
                })
            }

            return res.status(200).json({
                message: "Update success",
                datas : data
            })

        } catch (error) {
            return res.status(500).json({
                name : error.name,
                message : error.message
            })
        }
    },

    remove : async (req, res) => {
        try {

            const data = await Category.findByIdAndDelete(req.params.id)

            if(!data) {
                return res.status(404).json({
                    message: "Delete Failed"
                })
            }

            return res.status(200).json({
                message: "Delete success",
                datas : data
            })

        } catch (error) {
            return res.status(500).json({
                name : error.name,
                message : error.message
            })
        }
    },
}