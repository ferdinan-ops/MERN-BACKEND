const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const server = express();
const port = process.env.PORT || 4000;

// make req.body is json and CORS POLICY
server.use(bodyParser.json());
server.use(cors());

// all routes
const authRoutes = require("./src/routes/auth");
const blogRoutes = require("./src/routes/blog");

// endpoint url route
server.use("/v1/auth/", authRoutes);
server.use("/v1/blog/", blogRoutes);

// Express validator: catch error middleware
server.use((error, req, res, next) => {
  const { message, data } = error;
  const status = error.errorStatus || 500;
  res.status(status).json({ message, data });
  next();
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URL).then(() => {
  server.listen(port, () => {
    console.log(`Example server listening at http://localhost:${port}`);
  });
});

// mongoose connection
// mongoose
//   .connect(process.env.MONGODB_URL)
//   .then(() => {
//     // listening server
//     server.listen(port, () =>
//       console.log(`Server is listening on http://localhost:${port}`)
//     );
//   })
//   .catch((err) => {
//     console.log(err);
//   });
