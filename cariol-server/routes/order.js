const express = require('express');
const router = express.Router();
const Order = require('../models/order');  // Import model Order

router.post('/orders', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).send(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).send({ error: 'Error creating order', message: error.message });
  }
});

module.exports = router;
