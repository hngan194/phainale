const express = require('express');
const cartRouter = express.Router()

const cartCtrl = require('../controllers/cartCtrl');
const checkPermission = require('../middlewares/checkPermission');

cartRouter.get('/', cartCtrl.getAll)
cartRouter.get("/:id", cartCtrl.getDetail)

cartRouter.post('/', cartCtrl.create)
cartRouter.patch('/:id', cartCtrl.update)
cartRouter.delete('/:id', cartCtrl.remove)

module.exports = cartRouter