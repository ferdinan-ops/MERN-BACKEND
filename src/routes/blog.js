const express = require("express");
const { body } = require("express-validator");
const { createBlog } = require("../controllers/blog");
const upload = require("../middleware/upload");

const router = express.Router();
const blogValidator = [
  body("title")
    .isLength({ min: 5 })
    .withMessage("title is minimum 5 characters"),
  body("body").isLength({ min: 5 }).withMessage("body is minimum 5 characters"),
];

router.post("/post", upload.single("image"), blogValidator, createBlog);

module.exports = router;
