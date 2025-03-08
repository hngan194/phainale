const express = require('express');
const blogRouter = express.Router()

const blogCtrl = require('../controllers/blogCtrl');
const checkPermission = require('../middlewares/checkPermission');

blogRouter.get('/', blogCtrl.getAll)
blogRouter.get("/:id", blogCtrl.getDetail)

blogRouter.post('/', checkPermission, blogCtrl.create)
blogRouter.put('/:id', checkPermission, blogCtrl.update)
blogRouter.delete('/:id', checkPermission, blogCtrl.remove)

module.exports = blogRouter