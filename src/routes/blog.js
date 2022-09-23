const upload = require("../middlewares/upload");
const { body } = require("express-validator");
const express = require("express");
const router = express.Router();
const {
  createBlog,
  getAllBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
} = require("../controllers/blog");

const blogValidator = [
  body("title")
    .isLength({ min: 5 })
    .withMessage("title is minimum 5 characters"),
  body("body").isLength({ min: 5 }).withMessage("body is minimum 5 characters"),
];

router.post("/post", upload.single("image"), blogValidator, createBlog);
router.get("/posts", getAllBlog); // pagination using query router.get("/posts/?page=1&perPage=5", getAllBlog);
router.get("/post/:postId", getBlogById);
router.put("/post/:postId", upload.single("image"), blogValidator, updateBlog);
router.delete("/post/:postId", deleteBlog);

module.exports = router;
