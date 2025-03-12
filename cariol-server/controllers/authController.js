const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

// 🟢 Đăng ký người dùng
exports.register = async (req, res) => {
  try {
    console.log("📌 Nhận request đăng ký:", req.body); // 🔍 Kiểm tra dữ liệu nhận được

    const { first_name, last_name, phone, email, password } = req.body;
    if (!first_name || !last_name || !phone || !email || !password) {
      return res.status(400).json({ message: "Thiếu thông tin đăng ký!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userExists = await User.findOne({ $or: [{ email }, { phone }] });

    if (userExists) {
      console.log("❌ Tài khoản đã tồn tại:", userExists);
      return res.status(400).json({ message: "Tài khoản đã tồn tại" });
    }

    const newUser = new User({
      first_name,
      last_name,
      phone,
      email,
      password: hashedPassword,
      role: "client", // Mặc định là client
    });

    await newUser.save();
    console.log("✅ Đăng ký thành công:", newUser);
    res.json({ message: "Đăng ký thành công!", user: newUser });

  } catch (error) {
    console.error("❌ Lỗi server khi đăng ký:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// 🟢 API Đăng Nhập
exports.login = async (req, res) => {
  try {
    console.log("📌 Nhận request đăng nhập:", req.body);

    const { phone, password } = req.body;
    if (!phone || !password) {
      return res.status(400).json({ message: "Vui lòng nhập số điện thoại và mật khẩu!" });
    }

    // ✅ Tìm người dùng theo số điện thoại
    const user = await User.findOne({ phone });

    if (!user) {
      console.log("❌ Không tìm thấy tài khoản với số điện thoại:", phone);
      return res.status(401).json({ message: "Số điện thoại hoặc mật khẩu không đúng!" });
    }

    console.log("🔑 Mật khẩu nhập vào:", password);
    console.log("🔒 Mật khẩu trong database:", user.password);

    // ✅ Kiểm tra mật khẩu (so sánh với bcrypt hash)
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("❌ Mật khẩu không đúng!");
      return res.status(401).json({ message: "Số điện thoại hoặc mật khẩu không đúng!" });
    }

    // ✅ Tạo token JWT
    const token = jwt.sign({ id: user._id, role: user.role }, secretKey, { expiresIn: "24h" });

    console.log("✅ Đăng nhập thành công:", user);
    return res.json({ message: "Đăng nhập thành công!", token, role: user.role });

  } catch (error) {
    console.error("❌ Lỗi server khi đăng nhập:", error);
    return res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// // 🟢 Kiểm tra tài khoản tồn tại
exports.checkUserExists = async (req, res) => {
  try {
    const { phone, email } = req.body;

    // ✅ Kiểm tra input hợp lệ
    if (!phone && !email) {
      console.log("❌ Lỗi: Thiếu số điện thoại hoặc email để kiểm tra!");
      return res.status(400).json({ message: "Thiếu số điện thoại hoặc email!" });
    }

    console.log("🔍 Kiểm tra tài khoản với:", { phone, email });

    // ✅ Truy vấn MongoDB để kiểm tra user tồn tại
    const query = {};
    if (phone) query.phone = phone.trim();
    if (email) query.email = email.trim().toLowerCase();

    const user = await User.findOne(query);

    if (user) {
      console.log("✅ Tài khoản đã tồn tại:", user.phone);
      return res.status(200).json({ exists: true, message: "Tài khoản đã tồn tại!" });
    }

    console.log("❌ Tài khoản chưa tồn tại.");
    return res.status(200).json({ exists: false, message: "Tài khoản chưa được đăng ký!" });

  } catch (error) {
    console.error("❌ Lỗi server khi kiểm tra tài khoản:", error);
    return res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};


// 🟢 Cập nhật Role (dành cho Admin)
exports.updateRole = async (req, res) => {
  try {
    const { userId, newRole } = req.body;

    if (!["client", "admin"].includes(newRole)) {
      return res.status(400).json({ message: "Vai trò không hợp lệ" });
    }

    await User.findByIdAndUpdate(userId, { role: newRole });

    res.json({ message: `Cập nhật vai trò thành ${newRole} thành công!` });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};


exports.forgotPassword = async (req, res) => {
  try {
    const { identifier } = req.body; // Lấy email hoặc số điện thoại từ request

    if (!identifier) {
      return res.status(400).json({ message: "Vui lòng nhập email hoặc số điện thoại!" });
    }

    console.log("🔍 Kiểm tra tài khoản với:", identifier);

    // 🟢 Tìm kiếm user theo email hoặc số điện thoại
    const user = await User.findOne({
      $or: [{ email: identifier.toLowerCase() }, { phone: identifier }]
    });

    if (!user) {
      console.log("❌ Tài khoản không tồn tại:", identifier);
      return res.status(404).json({ message: "Tài khoản không tồn tại!" });
    }

    console.log("✅ Tài khoản hợp lệ:", user.email || user.phone);
    
    // 🟢 (Tuỳ chọn) Giả lập gửi email đặt lại mật khẩu
    return res.json({ message: "Hướng dẫn đặt lại mật khẩu đã được gửi qua email hoặc SMS." });

  } catch (error) {
    console.error("❌ Lỗi server khi quên mật khẩu:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};
