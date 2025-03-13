const express = require('express');
const app = express();
const port = 3002;
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;  // Import ObjectId từ mongoose
const router = express.Router();
// Cấu hình middleware
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());  // Cấu hình CORS toàn bộ ứng dụng

// Import Routes
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

// Kết nối Mongoose với MongoDB
const mongoUri = "mongodb+srv://ngannh22411c:RqiRhKKhKcSUhEiX@group7.zpydo.mongodb.net/cariol";
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB with Mongoose");


    // Mô hình cho Collection "products"
    const productSchema = new mongoose.Schema({
      name: String,
      price: Number,
      description: String,
    });
    const Product = mongoose.model("Product", productSchema);


    // Mô hình cho Collection "blogs"
    const blogSchema = new mongoose.Schema({
      title: String,
      content: String,
      author: String,
      images: [String]
    });
    const Blog = mongoose.model("Blog", blogSchema);
    // Đảm bảo bạn có một route DELETE để xóa bài blog
    app.delete('/blogs/:id', (req, res) => {
      const blogId = req.params.id;

      Blog.findByIdAndDelete(blogId)
        .then((deletedBlog) => {
          if (!deletedBlog) {
            return res.status(404).json({ error: 'Blog not found' });
          }
          res.status(200).json({ message: 'Blog deleted successfully' });
        })
        .catch((err) => {
          res.status(500).json({ error: 'Error deleting blog' });
        });
    });
    app.post('/blogs', (req, res) => {
      const { title, author, content, images } = req.body;
    
      const newBlog = new Blog({
        title,
        author,
        content,
        images
      });
    
      newBlog.save()
        .then(blog => res.status(201).json(blog))
        .catch(err => {
          console.error('Error saving blog:', err);  // Log lỗi để xác định nguyên nhân
          res.status(500).json({ error: 'Error saving blog' });
        });
    });
    const multer = require('multer');
const path = require('path');

// Cấu hình nơi lưu trữ file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Thư mục nơi các tệp hình ảnh sẽ được lưu
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);  // Đặt tên cho tệp
  }
});

// Khởi tạo Multer với các tùy chọn
const upload = multer({ storage: storage });
    // API để lấy danh sách sản phẩm
    app.get('/products', (req, res) => {
      const categoryName = req.query.categoryName;  // Lấy categoryName từ query params
    
      // Kiểm tra nếu categoryName tồn tại
      if (categoryName) {
        // Lọc sản phẩm theo categoryName
        Product.find({ categoryName: categoryName })
          .then(products => {
            res.json(products);  // Trả về các sản phẩm theo categoryName
          })
          .catch(err => {
            res.status(500).json({ error: 'Server Error' });
          });
      } else {
        // Nếu không có categoryName, trả về tất cả sản phẩm
        Product.find()
          .then(products => {
            res.json(products);  // Trả về tất cả sản phẩm
          })
          .catch(err => {
            res.status(500).json({ error: 'Server Error' });
          });
      }
    });
    // API để lấy danh sách blog
    app.get("/blogs", async (req, res) => {
      try {
        const result = await Blog.find({});
        res.send(result);
      } catch (error) {
        res.status(500).send("Error retrieving blogs");
      }
    });
    // Đảm bảo rằng bạn đang truyền một ObjectId hợp lệ khi thực hiện PUT request

    // API để lấy chi tiết blog theo ID
    app.get("/blogs/:id", async (req, res) => {
      const blogId = req.params.id;


      // Kiểm tra xem blogId có hợp lệ không
      if (!ObjectId.isValid(blogId)) {
        return res.status(400).send({ message: "Invalid blog ID" });
      }


      try {
        const blog = await Blog.findById(blogId);
        if (blog) {
          res.send(blog);
        } else {
          res.status(404).send({ message: "Blog not found" });
        }
      } catch (error) {
        console.error("Error retrieving blog:", error);  // Log lỗi chi tiết
        res.status(500).send("Error retrieving blog");
      }
    });
    // Khởi động server sau khi kết nối thành công
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.error("Error connecting to MongoDB", err);
    process.exit(1); // Dừng server nếu không thể kết nối MongoDB
  });


// Route mặc định
app.get("/", (req, res) => {
  res.send("This Web server is processed for MongoDB with Mongoose");
});
