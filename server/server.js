const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const {
  generateMessage,
  generateLocationMessage
} = require("./utils/messages");
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

  socket.emit("newMessage", generateMessage("Admin", "Welcome to chat app."));

  socket.broadcast.emit(
    "newMessage",
    generateMessage("Admin", "New user joined.")
  );

  socket.on("newMessage", (message, callback) => {
    io.emit("newMessage", generateMessage(message.from, message.text));

    callback({ success: true, message: "Got message." });
    // socket.broadcast.emit("newMessage", {
    //   // Posljes vsem razen sebi
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on("sendLocation", (coords, callback) => {
    callback();
    io.emit(
      "newLocationMessage",
      generateLocationMessage("Admin", coords.latitude, coords.longitude)
    );
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
