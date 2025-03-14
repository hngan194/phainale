const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["client", "admin", "staff"], default: "client" }, // Mặc định là "client"
  address: { type: String, default: '' },
  city: { type: String, default: '' },
  province: { type: String, default: '' },
});

module.exports = mongoose.model("User", UserSchema, "users");
