const { validationResult } = require("express-validator");
const BlogPost = require("../models/blog");
const path = require("path");
const fs = require("fs");

const createBlog = async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res
      .status(400)
      .json({ message: "Invalid Value", errror: error.array() });
  }

  if (!req.file) {
    return res.status(400).json({ message: "Image harus di upload" });
  }

  const { title, body } = req.body;
  const image = req.file.path.replace(/\\/g, "/");
  const blogData = { title, body, image, author: { id: 1, name: "Ferdinan" } };

  try {
    const newBlog = new BlogPost(blogData);
    const data = await newBlog.save();
    res.status(201).json({ message: "Blog created succesfully", data });
  } catch (error) {
    res.status(400).json({ message: "Something wrong", error });
  }

  next();
};

const getAllBlog = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = req.query.perPage || 5;
  let skipItems = (parseInt(currentPage) - 1) * parseInt(perPage);
  let totalItem;

  try {
    const totalDoc = await BlogPost.find().countDocuments();
    const data = await BlogPost.find().skip(skipItems).limit(parseInt(perPage));
    totalItem = totalDoc;

    res.status(201).json({
      message: "Get All Blog Successfully",
      data,
      total_data: totalItem,
      current_page: parseInt(currentPage),
      per_page: parseInt(perPage),
    });
  } catch (error) {
    res.status(400).json({ message: "Can't get all blog", error });
  }
  next();
};

const getBlogById = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const data = await BlogPost.findById(postId);
    if (!data) return res.status(400).json({ error: "No result for this id" });
    res.status(201).json({ message: "Get Blog by id success", data });
  } catch (error) {
    res.status(400).json({ message: "Something wrong", error });
  }
  next();
};

const updateBlog = async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res
      .status(400)
      .json({ message: "Invalid Value", errror: error.array() });
  }

  if (!req.file) {
    return res.status(400).json({ message: "Image harus di upload" });
  }

  const { postId } = req.params;
  const image = req.file.path.replace(/\\/g, "/");
  const newData = { title: req.body.title, body: req.body.body, image };

  try {
    const update = await BlogPost.findByIdAndUpdate(postId, newData);
    if (!update) return res.status(400).json({ message: "Not item found" });
    const data = await update.save();
    res.status(201).json({ message: "Updated successfully", data });
  } catch (error) {
    res.status(400).json({ message: "Something wrong", error });
  }
  next();
};

const deleteBlog = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const deleted = await BlogPost.findByIdAndDelete(postId);
    if (!deleted) return res.status(400).json({ message: "No item found" });
    deleteImage(deleted.image);
    res.status(201).json({ message: "Blog Deleted Success", data: deleted });
  } catch (error) {
    res.status(400).json({ message: "Something wrong...", error });
  }
  next();
};

const deleteImage = (filePath) => {
  filePath = path.join(__dirname, "../..", filePath);
  fs.unlinkSync(filePath, (err) => console.log(err));
};

module.exports = {
  createBlog,
  getAllBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
};
