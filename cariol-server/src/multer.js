const multer = require('multer')

const storage = multer.diskStorage({
    destination: 'images',
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: storage,
}).single('images')

module.exports = { upload }