const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();

const io = new Server(3001, {
  /* options */
});

io.on("connection", (socket) => {
  // ...
});
io.on("connection", (socket) => {
  // ...
});
const hostname = "192.168.4.28";
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on http://${hostname}:${port}`);
});
