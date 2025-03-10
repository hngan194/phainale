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


// 🟢 Đăng nhập
exports.login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, secretKey, { expiresIn: "1h" });

    res.json({ message: "Đăng nhập thành công", token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};

// 🟢 Kiểm tra tài khoản tồn tại
exports.checkUserExists = async (req, res) => {
  try {
    const { phone, email } = req.body;
    console.log("🔍 Kiểm tra tài khoản trong database với:", { phone, email });

    const user = await User.findOne({
      $or: [
        { email: email.trim().toLowerCase() },
        { phone: phone.trim() }
      ]
    });

    if (user) {
      console.log("❌ Tài khoản đã tồn tại:", user);
      return res.status(200).json({ exists: true, message: "Tài khoản đã tồn tại!" });
    }

    console.log("✅ Tài khoản chưa tồn tại, có thể đăng ký.");
    res.status(200).json({ exists: false, message: "Có thể sử dụng tài khoản này." });

  } catch (error) {
    console.error("❌ Lỗi server khi kiểm tra tài khoản:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
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

// 🟢 API Quên mật khẩu (chỉ kiểm tra email)
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email không tồn tại!" });
    }

    res.json({ message: "Nếu email tồn tại, bạn sẽ nhận được hướng dẫn đặt lại mật khẩu." });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};
