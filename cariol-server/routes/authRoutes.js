const express = require("express");
const { register, login, checkUserExists, updateRole, forgotPassword, loginAdmin, getUserList, verifyAdminPassword, updateProfile, changePassword } = require("../controllers/authController");
// const { verifyAdminPassword } = require("../controllers/authController");
const router = express.Router();

router.post("/login-admin", loginAdmin);
router.post("/register", register);
router.post("/login", login);
router.post("/check-user", checkUserExists);
router.post("/forgot-password", forgotPassword);  // Đảm bảo đã import từ authController
router.get("/users/list", getUserList);
router.post("/users/verify-admin", verifyAdminPassword);
router.put("/update-role", updateRole);
router.put("/update-profile", updateProfile);
router.put("/change-password", changePassword);


module.exports = router;
