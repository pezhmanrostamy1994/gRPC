const { listProduct, createProduct, updateProduct, getProduct, deleteProduct } = require("./../controllers/product.controller");

const router = require("express").Router();
router.get("/", listProduct);
router.get("/:id", getProduct);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
module.exports = {
    ProductRouter: router
}