//import dependencies
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

//import database

//express
const app = express();

//morgan
app.use(morgan("dev"));

//cors
app.use(cors());

//module export
module.exports = app;
