let socket = io();

socket.on("connect", function() {
  console.log("Connected to server.");

  socket.emit("createMessage", {
    from: "test1@test.com",
    text: "New message from client"
  });
});

socket.on("disconnect", function() {
  console.log("Server disconected.");
});

socket.on("newMessage", function(message) {
  console.log("Server send new message", message);
});
