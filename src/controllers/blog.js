const { validationResult } = require("express-validator");
const BlogPost = require("../models/blog");

const createBlog = async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res
      .status(400)
      .json({ message: "Invalid Value", data: error.array() });
  }

  if (!req.file) {
    return res.status(400).json({ message: "Image harus di upload" });
  }

  const { title, body } = req.body;
  const image = req.file.path;
  const data = { title, body, image, author: { id: 1, name: "Ferdinan" } };
  const newBlog = new BlogPost(data);

  const newData = await newBlog.save();
  res.status(201).json({ message: "Blog created succesfully", data: newData });

  next();
};

module.exports = { createBlog };
