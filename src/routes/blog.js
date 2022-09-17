const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const { createBlog } = require("../controllers/blog");

router.post(
  "/post",
  [
    body("title")
      .isLength({ min: 5 })
      .withMessage("title is minimum 5 characters"),
    body("body")
      .isLength({ min: 5 })
      .withMessage("body is minimum 5 characters"),
  ],
  createBlog
);

module.exports = router;
