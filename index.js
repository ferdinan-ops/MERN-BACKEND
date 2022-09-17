const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const server = express();
const port = 4000;

// all routes
const authRoutes = require("./src/routes/auth");
const blogRoutes = require("./src/routes/blog");

// make req.body is json
server.use(bodyParser.json());

// handle Web CORS POLICY
server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

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

// mongoose connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    // listening server
    server.listen(port, () =>
      console.log(`Server is listening on http://localhost:${port}`)
    );
  })
  .catch((err) => {
    console.log(err);
  });
