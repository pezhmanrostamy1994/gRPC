const router = require("express").Router();
const { BlogRouter } = require("./blog.routes");
const {ProductRouter} = require("./product.routes")
router.use('/product', ProductRouter)
router.use('/blog', BlogRouter)
module.exports = {
    AllRoutes: router
}