const express = require("express");
const { register, login, checkUserExists, updateRole, forgotPassword } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/check-user", checkUserExists);
router.post("/forgot-password", forgotPassword);  // Đảm bảo đã import từ authController

module.exports = router;
