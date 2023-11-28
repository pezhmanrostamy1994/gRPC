const { listBlog, createBlog, updateBlog, getBlog, deleteBlog } = require("../controllers/blog.controller");

const router = require("express").Router();
router.get("/", listBlog);
router.get("/:id", getBlog);
router.post("/", createBlog);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);
module.exports = {
    BlogRouter: router
}