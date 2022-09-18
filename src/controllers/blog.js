const { validationResult } = require("express-validator");
const BlogPost = require("../models/blog");

const createBlog = (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    const err = new Error("Invalid Value");
    err.errorStatus = 400;
    err.data = error.array();
    throw err;
  }

  if (!req.file) {
    const err = new Error("Image harus di upload");
    err.errorStatus = 422;
    throw err;
  }

  const { title, body } = req.body;
  const image = req.file.filename;

  console.log(title, body, image);
  // const data = { title, body, image, author: { id: 1, name: "Ferdinan" } };

  // const newBlog = new BlogPost(data);
  // newBlog
  //   .save()
  //   .then(() => res.status(201).json({ message: "Blog has been created" }))
  //   .catch((err) => res.status(400).json("Error:" + err));

  next();
};

module.exports = { createBlog };
