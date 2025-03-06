const express = require('express');
const categoriesRouter = express.Router()

const categories = require('../controllers/categoryCtrl');
const checkPermission = require('../middlewares/checkPermission');

categoriesRouter.get('/', categories.getAll)
categoriesRouter.get("/:id", categories.getDetail)
categoriesRouter.post('/', checkPermission, categories.create)
categoriesRouter.put('/:id', checkPermission, categories.update)
categoriesRouter.delete('/:id', checkPermission, categories.remove)

module.exports = categoriesRouter