const express = require('express');
const router = express.Router();

const authRouter = require('./authRoutes')

const categoriesRouter = require('./categoryRoutes')
const productRouter = require('./productRoutes')
const blogRouter = require('./blogRoutes')
const cartRouter = require('./cartRoutes')
const orderRouter = require('./orderRoutes')
const billingRouter = require('./billingRoutes')

const ImgsRouter = require('./uploadImgRoutes');
const upload = require('../middlewares/uploadMidle');


router.get('/', (req, res) => {
    res.render('index');
})

router.use("/auth", authRouter)

router.use("/category", categoriesRouter)
router.use("/product", productRouter)
router.use("/blog", blogRouter)
router.use("/cart", cartRouter)
router.use("/order", orderRouter)
router.use("/billing", billingRouter)

router.use("/images",ImgsRouter)

module.exports = router