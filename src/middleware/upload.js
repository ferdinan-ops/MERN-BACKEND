const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".png" && ext !== ".jpeg" && ext !== ".gif") {
      return cb(
        res.status(400).end("only jpg, png, jpeg, gif is allowed"),
        false
      );
    }
    cb(null, true);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
