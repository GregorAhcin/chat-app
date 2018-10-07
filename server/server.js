const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;

// console.log(__dirname + "/../public");
// console.log(publicPath);

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", socket => {
  console.log("New user connected.");

  socket.emit("newMessage", {
    from: "test@test.com",
    text: "New message is in.",
    createdAt: 11111111
  });

  socket.on("createMessage", message => {
    console.log("New message created", message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
