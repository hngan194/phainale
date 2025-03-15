const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    user_id: { type: String, required: false },
    name: { type: String, required: true }
  },
  items: [{
    product_id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
  }],
  total_price: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  shipping_address: { type: String, required: true },
  phone: { type: String, required: true },
  payment_method: { type: String, required: true },
  note: { type: String },
  order_date: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
