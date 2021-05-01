//Import dotenv
require("dotenv").config();
const socketio = require("socket.io");

//import server
const server = require("./src/server");

//import utils
const formatMessage = require("./src/utils/message");
const { userJoin, getCurrentUser, userLeave } = require("./src/utils/user");

//dotenv
const { PORT, NODE_ENV } = process.env;

//start server
const httpServer = server.listen(PORT, () => {
  console.log(`Server is running http://localhost:${PORT} and use ${NODE_ENV}`);
});

const io = socketio(httpServer, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

const botName = "ChatroomBot";

//run when client connects
io.on("connection", (socket) => {
  //Join room
  socket.on("joinRoom", ({ username, roomId }) => {
    const user = userJoin(socket.id, username, roomId);

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
  socket.on("exitRoom", () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.roomId).emit(
        "message",
        formatMessage(botName, `${user.username} has left the chat`)
      );
    }
  });

  //Listen for ChatMessage
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);

    io.to(user.roomId).emit("message", formatMessage(user.username, msg));
  });

  //Runs when client disconnects
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.roomId).emit(
        "message",
        formatMessage(botName, `${user.username} has left the chat`)
      );
    }
  });
});

//module exports
module.exports = server;
