require('dotenv').config(); // Load biến môi trường từ .env
const mongoose = require('mongoose');

// Lấy URI từ file .env
const mongoURI = process.env.MONGO_URI;

// Kết nối đến MongoDB
mongoose.connect(mongoURI);

// Khởi động server Node.js (nếu cần)
const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.send("Server đang chạy và kết nối MongoDB thành công!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
