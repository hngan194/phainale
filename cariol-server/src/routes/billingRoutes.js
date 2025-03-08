const express = require('express');
const billingRouter = express.Router()

const billingCtrl = require('../controllers/billingCtrl');
const checkPermission = require('../middlewares/checkPermission');

billingRouter.get('/', billingCtrl.getAll)
billingRouter.get("/:id", billingCtrl.getDetail)

billingRouter.post('/', checkPermission, billingCtrl.create)
billingRouter.put('/:id', checkPermission, billingCtrl.update)
billingRouter.delete('/:id', checkPermission, billingCtrl.remove)

module.exports = billingRouter