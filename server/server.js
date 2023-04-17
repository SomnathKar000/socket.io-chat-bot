const express = require("express");
const socket_io = require("socket.io");
const { createServer } = require("http");

const app = express();

const server = createServer(app);

const io = socket_io(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("The socket" + socket);
  console.log("Socket is active to be connected");
  socket.on("chat", (data) => {
    console.log("The chat event data: " + data);
    io.emit("chat", data);
  });
});

// app.listen(5000, () => console.log("Server is listening on 5000"));
server.listen(5000, () => console.log("Server is listening on 5000..."));
