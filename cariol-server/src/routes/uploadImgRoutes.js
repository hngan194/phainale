const express = require("express");

const ImgsRouter = express.Router();

const { uploadImgs } = require("../controllers/uploadImgCtrl");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../configs/cloudinary");
const multer = require("multer");

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params : {
        folder : "gentlepetals",
        allowedFormats : ["jpg", "png"],
    }
})

const upload = multer({storage : storage})

ImgsRouter.post("/upload", upload.array("images", 10), uploadImgs);

module.exports = ImgsRouter;