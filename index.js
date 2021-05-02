//import dependencies
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const socketio = require("socket.io");

//import database
const db = require("./src/config/database");

//import data
const formatMessage = require("./src/utils/message");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  userValidate,
} = require("./src/services/users");

//express
const app = express();

//morgan
app.use(morgan("dev"));

//cors
app.use(cors());

//dotenv
const { PORT, NODE_ENV } = process.env;

//start server
const server = app.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT} and use ${NODE_ENV}`);
});

const io = socketio(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

const botName = "ChatroomBot";

//run when client connects
io.on("connection", (socket) => {
  //Join room
  socket.on("joinRoom", async ({ username, roomId }) => {
    const user = await userJoin(socket.id, username, roomId);

    socket.join(user.roomId);

    //Welcome current user
    socket.emit("message", formatMessage(botName, "Welcome to Chatroom"));

    //Broadcast when a user connects
    socket.broadcast
      .to(user.roomId)
      .emit(
        "message",
        formatMessage(botName, `${user.username} has join the chat`)
      );
  });

  //Exit rooms
  socket.on("exitRoom", async () => {
    const user = await userLeave(socket.id);

    if (user) {
      io.to(user.roomId).emit(
        "message",
        formatMessage(botName, `${user.username} has left the chat`)
      );
    }
  });

  //Validate
  socket.on("validation", async ({ username, roomId }) => {
    const validated = await userValidate(username, roomId);

    socket.emit("validated", validated);
  });

  //Listen for ChatMessage
  socket.on("chatMessage", async (msg) => {
    const user = await getCurrentUser(socket.id);

    io.to(user.roomId).emit("message", formatMessage(user.username, msg));
  });

  //Runs when client disconnects
  socket.on("disconnect", async () => {
    const user = await userLeave(socket.id);

    if (user) {
      io.to(user.roomId).emit(
        "message",
        formatMessage(botName, `${user.username} has left the chat`)
      );
    }
  });
});

//module exports
module.exports = app;
