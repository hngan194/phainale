

module.exports = {
    uploadImgs : async (req, res) => {
        try {
            const Imgs = req.files.map(file => file.path);

            const uploadImgs = []

            for (let i in Imgs){
                const result = await Cloudinary.uploader.upload(image)
                console.log(result)

                uploadImgs.push({
                    publicId: result.public_id,
                    url: result.secure_url
                })
            }

            return res.status(200).json({
                message: "Đăng ảnh thành công",
                data: uploadImgs
            });

        } catch (error) {
            return res.status(500).json({
                message: "Server Error",
                error
            });
        }
    }
}