const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const path = require("path");

require("dotenv").config();
const server = express();
const port = process.env.PORT || 4000;

// MongoDB connection
require("./src/config/db").connectDB(server, port);

// make req.body is json and CORS POLICY
server.use(bodyParser.json());
server.use(cors());

// endpoint url route
server.use("/v1/auth/", require("./src/routes/auth"));
server.use("/v1/blog/", require("./src/routes/blog"));
server.use("/images", express.static(path.join(__dirname, "images"))); // get image route
