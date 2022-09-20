const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

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
