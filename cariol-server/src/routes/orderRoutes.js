const express = require('express');
const orderRouter = express.Router()

const orderCtrl = require('../controllers/orderCtrl');
const checkPermission = require('../middlewares/checkPermission');

orderRouter.get('/', orderCtrl.getAll)
orderRouter.get("/:id", orderCtrl.getDetail)

orderRouter.post('/', checkPermission, orderCtrl.create)
orderRouter.put('/:id', checkPermission, orderCtrl.update)
orderRouter.delete('/:id', checkPermission, orderCtrl.remove)

module.exports = orderRouter