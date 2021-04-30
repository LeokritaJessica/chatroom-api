//import dependencies
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const http = require("http")
const socketio = require("socket.io")

//import routes

//import database

//express
const app = express();

//http
const httpServer = http.createServer(app)

//socket io
const io = socketio(httpServer);

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//run when client connects
io.on('connection', socket => {
  console.log("New WS connection...")
})

//morgan
app.use(morgan("dev"));

//cors
app.use(cors());

//Routes

//module export
module.exports = app;
