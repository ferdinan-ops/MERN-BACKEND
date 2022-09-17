const { validationResult } = require("express-validator");

exports.createBlog = (req, res, next) => {
   const { title, image, body } = req.body;

   const error = validationResult(req);

   if (!error.isEmpty()) {
      const err = new Error("Invalid Value");
      err.errorStatus = 400;
      err.data = error.array();
      throw err;
   }

   res.status(201).json({
      message: "Blog Created Successfully",
      data: {
         post_id: 1,
         title,
         image,
         body,
         created_at: "12/10/2020",
         author: { id: 1, name: "Testing" },
      },
   });

   next();
};
