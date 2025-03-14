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
      alert ('Số điện thoại hoặc email đã được đăng ký!')
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
    return res.json({ 
      message: "Đăng nhập thành công!",
      token,
      role: user.role,
      first_name: user.first_name,   // Thêm first_name
      last_name: user.last_name,     // Thêm last_name
      phone: user.phone,             // Thêm phone
      email: user.email,             // Thêm email
      address: user.address,         // Thêm address
      city: user.city,               // Thêm city
      province: user.province        // Thêm province
    });

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
      return res.status(200).json({ exists: true, message: "Tài khoản đã tồn tại!",
      userId: user._id  // Trả về userId để sử dụng khi cập nhật role
      });
      
    }

    console.log("❌ Tài khoản chưa tồn tại.");
    return res.status(200).json({ exists: false, message: "Tài khoản chưa được đăng ký!" });

  } catch (error) {
    console.error("❌ Lỗi server khi kiểm tra tài khoản:", error);
    return res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};




// Quên mật khẩu
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
    

    return res.json({ message: "Hướng dẫn đặt lại mật khẩu đã được gửi qua email hoặc SMS." });

  } catch (error) {
    console.error("❌ Lỗi server khi quên mật khẩu:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};


// loginAdmin
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Vui lòng nhập email và mật khẩu!" });
    }

    // Tìm user theo email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Tài khoản không tồn tại!" });
    }

    // Kiểm tra role (chỉ Admin hoặc Staff mới được vào)
    if (user.role !== "admin" && user.role !== "staff") {
      return res.status(403).json({ message: "Bạn không có quyền truy cập vào hệ thống quản trị!" });
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Email hoặc mật khẩu không đúng!" });
    }

    // Tạo token JWT
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: "24h" });

    // Trả về thông tin người dùng, bao gồm last_name và email
    res.json({
      message: "Đăng nhập thành công!",
      token,
      role: user.role,
      email: user.email,    // Trả về email
      last_name: user.last_name  // Trả về last_name
    });

  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};



// 🟢 Lấy danh sách user có role là admin hoặc staff
exports.getUserList = async (req, res) => {
  try {
    const users = await User.find(
      { role: { $in: ["admin", "staff"] } }, // Chỉ lấy user có role admin hoặc staff
      "last_name email role" // Chỉ trả về các trường cần thiết
    );
    res.json({ users });
  } catch (error) {
    console.error("❌ Lỗi lấy danh sách user:", error);
    res.status(500).json({ message: "Lỗi server!" });
  }
};



// 🟢 Xác minh mật khẩu admin trước khi cập nhật role
exports.verifyAdminPassword = async (req, res) => {
  try {
    const { password } = req.body;

    // Mật khẩu cố định
    const FIXED_PASSWORD = "admin123";  // Mật khẩu cố định (có thể thay đổi theo yêu cầu)

    // Kiểm tra mật khẩu nhập vào với mật khẩu cố định
    if (password === FIXED_PASSWORD) {
      return res.json({ message: "Xác thực thành công!" });
    }

    // Nếu mật khẩu không khớp, trả về lỗi
    return res.status(401).json({ message: "Mật khẩu không chính xác!" });

  } catch (error) {
    res.status(500).json({ message: "Lỗi server!" });
  }
};


// 🟢 Cập nhật role người dùng
exports.updateRole = async (req, res) => {
  try {
    const { email, newRole } = req.body;

    // Kiểm tra xem email và role mới có được gửi đầy đủ hay không
    if (!email || !newRole) {
      return res.status(400).json({ message: "Email và role không hợp lệ!" });
    }

    // Tìm user theo email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng với email này!" });
    }

    // Cập nhật role cho user
    user.role = newRole;
    await user.save();  // Lưu thay đổi vào database

    console.log(`Cập nhật vai trò thành công: ${user.email} - ${user.role}`);
    res.json({ message: `Cập nhật vai trò của ${user.email} thành ${newRole} thành công!` });
  } catch (error) {
    console.error("Lỗi khi cập nhật vai trò:", error);
    res.status(500).json({ message: "Lỗi server khi cập nhật role!" });
  }
};

exports.updateProfile = async (req, res) => {
  const { first_name, last_name, phone, email, address, city, province } = req.body;

  // Lấy token từ header Authorization
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Giải mã token để lấy userId
    const decoded = jwt.verify(token, secretKey);  // Giải mã token
    const userId = decoded.id;  // Lấy userId từ token

    // Tìm và cập nhật thông tin người dùng trong database
    const user = await User.findByIdAndUpdate(
      userId, // Dùng userId lấy từ token
      { first_name, last_name, phone, email, address, city, province },
      { new: true } // Trả về người dùng đã được cập nhật
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);  // Trả về dữ liệu người dùng đã được cập nhật
  } catch (error) {
    console.error("Lỗi khi cập nhật hồ sơ:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


// Cập nhật mật khẩu người dùng
exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // Giải mã token để lấy userId
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.id;

    // Tìm người dùng theo userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Kiểm tra mật khẩu cũ
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Mật khẩu cũ không đúng!" });
    }

    // Hash mật khẩu mới và cập nhật
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Đổi mật khẩu thành công!" });
  } catch (error) {
    console.error("Lỗi khi đổi mật khẩu:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
