const mongoose = require("mongoose");

const voucherSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discount: { type: Number, required: true },
  minOrderValue: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true }
});
const VoucherModel = require('../models/Voucher');  // Đảm bảo rằng đường dẫn đúng đến file Voucher.js

module.exports = mongoose.model("Voucher", voucherSchema);
