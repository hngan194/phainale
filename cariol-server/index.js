const express = require('express');
const app = express();
const port = 3002;
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;  // Import ObjectId từ mongoose
const router = express.Router();
const VoucherModel = require('./models/Voucher'); // Đảm bảo rằng đường dẫn chính xác đến file VoucherModel
const orderRoutes = require('./routes/order');  // Import routes for order

// Cấu hình middleware
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());  // Cấu hình CORS toàn bộ ứng dụng

// Import Routes
const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);
const voucherRoutes = require('./routes/voucherRoutes'); // Đảm bảo đường dẫn chính xác
app.use('/vouchers', voucherRoutes);  // Thêm route vào server
app.use(orderRoutes);

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
      images: String,  // Đảm bảo rằng trường image tồn tại và có giá trị hợp lệ
      amount: Number,
      color: String,
      categoryName: String,
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
    
      // API để lấy danh sách đơn hàng
      app.get("/orders", async (req, res) => {
        try {
          const orders = await Order.find({});
          res.send(orders);
        } catch (error) {
          res.status(500).send("Error retrieving orders");
        }
      });
  
      //API Lấy Chi Tiết Đơn Hàng Theo ID
      app.get("/orders/:id", async (req, res) => {
        const orderId = req.params.id;
      
        if (!ObjectId.isValid(orderId)) {
          return res.status(400).send({ message: "Invalid order ID" });
        }
      
        try {
          const order = await Order.findById(orderId);
          if (order) {
            res.send(order);
          } else {
            res.status(404).send({ message: "Order not found" });
          }
        } catch (error) {
          res.status(500).send("Error retrieving order");
        }
      });
      
      //API Tạo Đơn Hàng Mới
      router.post('/orders', async (req, res) => {
        try {
          const newOrder = new Order(req.body);
          await newOrder.save();
          res.status(201).send(newOrder);
        } catch (error) {
          console.error('Error creating order:', error);  // Log error chi tiết
          res.status(500).send({ error: 'Error creating order', message: error.message });
        }
      });
      app.post("/orders", async (req, res) => {
        try {
          console.log("Dữ liệu đơn hàng nhận từ client:", req.body); // Kiểm tra dữ liệu từ client
          const newOrder = new Order(req.body);
          await newOrder.save();
          res.status(201).send(newOrder);
        } catch (error) {
          console.error("Lỗi khi tạo đơn hàng:", error); // Log lỗi chi tiết
          res.status(500).send("Error creating order");
        }
      });
      
      
      //API Cập Nhật Đơn Hàng
      app.put("/orders/:id", async (req, res) => {
        const orderId = req.params.id;
      
        if (!ObjectId.isValid(orderId)) {
          return res.status(400).send({ message: "Invalid order ID" });
        }
      
        try {
          const updatedOrder = await Order.findByIdAndUpdate(orderId, req.body, { new: true });
          if (updatedOrder) {
            res.send(updatedOrder);
          } else {
            res.status(404).send({ message: "Order not found" });
          }
        } catch (error) {
          res.status(500).send("Error updating order");
        }
      });
  
      //API Xóa Đơn Hàng
      app.delete("/orders/:id", async (req, res) => {
        const orderId = req.params.id;
      
        if (!ObjectId.isValid(orderId)) {
          return res.status(400).send({ message: "Invalid order ID" });
        }
      
        try {
          const deletedOrder = await Order.findByIdAndDelete(orderId);
          if (deletedOrder) {
            res.send({ message: "Order deleted successfully" });
          } else {
            res.status(404).send({ message: "Order not found" });
          }
        } catch (error) {
          res.status(500).send("Error deleting order");
        }
      });
  
        // ✅ API THÊM VOUCHER (POST)
  app.post("/vouchers", async (req, res) => {
    try {
      const { code, discount, minOrderValue, startDate, endDate } = req.body;

      if (!code || !discount || !minOrderValue || !startDate || !endDate) {
        return res.status(400).json({ message: "Thiếu dữ liệu bắt buộc" });
      }

      const newVoucher = new VoucherModel({
        code,
        discount,
        minOrderValue,
        startDate,
        endDate,
      });

      const savedVoucher = await newVoucher.save();
      res.status(201).json({ message: "Thêm voucher thành công", voucher: savedVoucher });
    } catch (error) {
      console.error("🔥 Lỗi khi thêm voucher:", error);
      res.status(500).json({ message: "Lỗi server", error: error.message });
    }
  });

  // ✅ API CẬP NHẬT VOUCHER (PUT)
  app.put("/vouchers/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID không hợp lệ" });
      }

      const updatedVoucher = await VoucherModel.findByIdAndUpdate(id, updateData, { new: true });

      if (!updatedVoucher) {
        return res.status(404).json({ message: "Voucher không tồn tại" });
      }

      res.status(200).json({ message: "Cập nhật thành công", updatedVoucher });
    } catch (error) {
      console.error("🔥 Lỗi cập nhật voucher:", error);
      res.status(500).json({ message: "Lỗi server", error: error.message });
    }
  });

  // ✅ API DELETE VOUCHER
  app.delete("/vouchers/:id", async (req, res) => {
    try {
      const { id } = req.params;

      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID không hợp lệ" });
      }

      const result = await VoucherModel.findByIdAndDelete(id);
      if (!result) {
        return res.status(404).json({ message: "Voucher không tồn tại" });
      }

      res.status(200).json({ message: "Xóa thành công", deletedVoucher: result });
    } catch (error) {
      console.error("🔥 Lỗi xóa voucher:", error);
      res.status(500).json({ message: "Lỗi server", error: error.message });
    }
  });
  app.get('/vouchers/:code', async (req, res) => {
    const { code } = req.params;
    const voucher = await VoucherModel.findOne({ code: code });
  
    if (!voucher) {
      return res.status(404).json({ error: 'Voucher not found' });
    }
  
    res.json({ discount: voucher.discount });
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
    app.get('/product/:id', async (req, res) => {
      const productId = req.params.id;
      
      // Kiểm tra xem productId có hợp lệ không
      if (!ObjectId.isValid(productId)) {
        return res.status(400).send({ message: "Invalid product ID" });
      }
    
      try {
        // Lấy thông tin sản phẩm từ MongoDB
        const product = await Product.findById(productId);
        
        // Kiểm tra nếu sản phẩm không tồn tại
        if (product) {
          res.send(product);  // Trả về sản phẩm
        } else {
          res.status(404).send({ message: "Product not found" });
        }
      } catch (error) {
        console.error("Error retrieving product:", error);  // Log lỗi chi tiết
        res.status(500).send("Error retrieving product");
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
