const jwt = require('jsonwebtoken')
const { Account } = require('../models/Account')
const dotenv = require('dotenv')
dotenv.config()

const { SECRET_CODE } = process.env

const checkPermission = async (req, res, next) => {
    try {
        // 1 - Kiểm tra đăng nhập 
        const token = req.headers.authorization?.split(" ")[1]

        // 2 - Kiểm tra token
        if(!token){
            return res.status(403).json({
                message : "Chưa đăng nhập"
            })
        }

        // 3 - Kiểm tra quyền
        const decoded = jwt.verify(token, SECRET_CODE)
        const user = await Account.findById(decoded._id)

        if(!user){
            return res.status(403).json({
                message : "Token Lỗi"
            })
        }

        if(user.role != 'admin'){
            return res.status(400).json({
                message : "User Không Có Quyền"
            })
        }

        // 4 - next
        next()

    } catch (error) {
        return res.json({
            name : error.name,
            "tên":"Lỗi ngoài",
            message: error.message,
        })
    }
}

module.exports = checkPermission