const { Blog } = require('../models/Blog');
const { blogValidator } = require('../validation/blogValid');
const cloudinary = require('../config/cloudinary'); // Import cấu hình Cloudinary

module.exports = {
    // Lấy tất cả các blog
    getAll: async (req, res) => {
        try {
            const blogList = await Blog.find({});

            if (!blogList || blogList.length === 0) {
                return res.status(404).json({ message: "Không tìm thấy Blog nào cả !" });
            }
            res.status(200).json({
                message: "Tìm thấy Blog rồi !",
                data: blogList
            });
        } catch (error) {
            res.status(500).json({
                name: error.name,
                message: error.message,
            });
        }
    },

    // Lấy chi tiết một blog theo ID
    getDetail: async (req, res) => {
        try {
            const blog = await Blog.findById(req.params.id);
            if (!blog) {
                return res.status(404).json({ message: "Không tìm thấy Blog nào cả !" });
            }
            res.status(200).json({
                message: "Tìm thấy Blog !",
                data: blog
            });
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    },

    // Tạo blog mới
    create: async (req, res) => {
        try {
            const { error } = blogValidator.validate(req.body);

            if (error) {
                return res.status(400).json({
                    message: error.details[0].message
                });
            }

            // Nếu có hình ảnh (hoặc video), tải lên Cloudinary
            let image_url = '';
            let image_public_id = '';

            if (req.body.imageFile) {
                const result = await cloudinary.uploader.upload(req.body.imageFile, { resource_type: 'auto' });

                image_url = result.secure_url; // Lưu URL của hình ảnh/video
                image_public_id = result.public_id; // Lưu public_id của hình ảnh/video
            }

            // Tạo blog mới
            const blog = await Blog.create({
                title: req.body.title,
                content: req.body.content,
                accountId: req.body.accountId,
                image_url,         // Lưu URL của hình ảnh/video
                image_public_id,   // Lưu public_id của hình ảnh/video
            });

            if (!blog) {
                return res.status(404).json({ message: "Tạo Blog không thành công" });
            }

            return res.status(200).json({
                message: "Tạo Blog thành công",
                data: blog
            });
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    },

    // Cập nhật blog
    update: async (req, res) => {
        try {
            const blog = await Blog.findById(req.params.id);

            if (!blog) {
                return res.status(404).json({ message: "Không tìm thấy blog cần sửa" });
            }

            // Nếu có hình ảnh mới, tải lên Cloudinary
            let image_url = blog.image_url;
            let image_public_id = blog.image_public_id;

            if (req.body.imageFile) {
                // Xóa hình ảnh cũ trên Cloudinary
                if (image_public_id) {
                    await cloudinary.uploader.destroy(image_public_id);
                }

                // Tải lên hình ảnh mới
                const result = await cloudinary.uploader.upload(req.body.imageFile, { resource_type: 'auto' });
                image_url = result.secure_url;
                image_public_id = result.public_id;
            }

            // Cập nhật blog
            const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, {
                ...req.body,
                image_url,          // Cập nhật URL của hình ảnh/video
                image_public_id,    // Cập nhật public_id của hình ảnh/video
            }, {
                new: true,
            });

            if (!updatedBlog) {
                return res.status(404).json({ message: "Sửa Blog không thành công" });
            }

            return res.status(200).json({
                message: "Sửa Blog thành công",
                data: updatedBlog
            });
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    },

    // Xoá blog
    remove: async (req, res) => {
        try {
            const blog = await Blog.findById(req.params.id);
            if (!blog) {
                return res.status(404).json({ message: "Không tìm thấy blog cần xoá" });
            }

            // Xoá hình ảnh trên Cloudinary nếu có
            if (blog.image_public_id) {
                await cloudinary.uploader.destroy(blog.image_public_id);
            }

            const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

            if (!deletedBlog) {
                return res.status(400).json({
                    message: "Không tìm thấy blog để xoá"
                });
            }

            return res.status(200).json({
                message: "Xoá blog thành công",
                data: deletedBlog
            });
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    }
};
