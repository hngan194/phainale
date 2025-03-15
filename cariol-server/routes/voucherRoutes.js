const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Voucher = require("../models/Voucher");

// Lấy danh sách voucher
router.get("/", async (req, res) => {
  try {
    const vouchers = await Voucher.find();
    res.json(vouchers);
  } catch (error) {
    res.status(500).json({ error: "Lỗi server" });
  }
});

// Kiểm tra mã voucher
// Định nghĩa route cho API /vouchers/validate
router.post('/validate', async (req, res) => {
  try {
    const { code, totalPrice } = req.body;

    if (!code) {
      return res.status(400).json({ message: "Vui lòng nhập mã giảm giá." });
    }

    const voucher = await Voucher.findOne({ code });  // Sử dụng Voucher thay vì VoucherModel
    if (!voucher) {
      return res.status(404).json({ message: "Mã giảm giá không hợp lệ." });
    }

    const now = new Date();
    if (now < voucher.startDate) {
      return res.status(400).json({ message: "Mã giảm giá chưa có hiệu lực." });
    }
    if (now > voucher.endDate) {
      return res.status(400).json({ message: "Mã giảm giá đã hết hạn." });
    }

    if (totalPrice < voucher.minOrderValue) {
      return res.status(400).json({
        message: `Đơn hàng phải đạt tối thiểu ${voucher.minOrderValue.toLocaleString()} VNĐ để áp dụng mã này.`
      });
    }

    return res.json({ message: "Voucher hợp lệ!", discount: voucher.discount });

  } catch (error) {
    console.error("Lỗi xảy ra khi kiểm tra voucher:", error);  // In lỗi chi tiết
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
});



// Thêm mới voucher
router.post("/", async (req, res) => {
  console.log("Received POST /vouchers", req.body);
  const { code, discount, minOrderValue, startDate, endDate } = req.body;

  if (!code || !discount || !minOrderValue || !startDate || !endDate) {
      return res.status(400).json({ error: "Thiếu thông tin voucher" });
  }

  try {
      const newVoucher = new Voucher({ code, discount, minOrderValue, startDate, endDate });
      await newVoucher.save();
      res.status(201).json(newVoucher);
  } catch (error) {
      console.error("Error adding voucher:", error);
      res.status(500).json({ error: "Không thể thêm voucher" });
  }
});

router.delete('/vouchers/:id', async (req, res) => {
  try {
      const result = await Voucher.findByIdAndDelete(req.params.id);
      if (!result) {
          return res.status(404).json({ message: 'Voucher không tồn tại' });
      }
      res.json({ message: 'Voucher đã được xóa' });
  } catch (error) {
      res.status(500).json({ message: 'Lỗi server', error });
  }
});

// ✅ API CẬP NHẬT VOUCHER
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID không hợp lệ" });
    }

    const updatedVoucher = await Voucher.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedVoucher) {
      return res.status(404).json({ message: "Voucher không tồn tại" });
    }

    res.status(200).json({ message: "Cập nhật thành công", updatedVoucher });
  } catch (error) {
    console.error("🔥 Lỗi cập nhật voucher:", error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
});

module.exports = router;
