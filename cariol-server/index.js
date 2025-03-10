const express = require('express');
const app = express();
const port = 3002;
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient, ObjectId } = require('mongodb');

// Cấu hình middleware
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());  // Cấu hình CORS toàn bộ ứng dụng

// Kết nối MongoDB
const mongoUri = "mongodb+srv://ngannh22411c:RqiRhKKhKcSUhEiX@group7.zpydo.mongodb.net/";
const client = new MongoClient(mongoUri);

client.connect()
  .then(() => {
    console.log("Connected to MongoDB");
    const database = client.db("cariol");
    const productsCollection = database.collection("products");
    const blogsCollection = database.collection("blogs");

    // API để lấy danh sách sản phẩm
    app.get("/products", async (req, res) => {
      try {
        const result = await productsCollection.find({}).toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send("Error retrieving products");
      }
    });

    // API để lấy danh sách blog
    app.get("/blogs", async (req, res) => {
      try {
        const result = await blogsCollection.find({}).toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send("Error retrieving blogs");
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
  res.send("This Web server is processed for MongoDB");
});
