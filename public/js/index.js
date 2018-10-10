let socket = io();

socket.on("connect", function() {
  console.log("Connected to server.");
});

socket.on("disconnect", function() {
  console.log("Server disconected.");
});

socket.on("newMessage", function(message) {
  console.log("Server sent new message", message);
  var li = document.createElement("li");
  var liText = document.createTextNode(message.from + ": " + message.text);
  li.appendChild(liText);

  document.getElementById("messages").appendChild(li);
});

var form = document.getElementById("message-form");
form.addEventListener("submit", function(e) {
  e.preventDefault();

  socket.emit(
    "newMessage",
    {
      from: "User",
      text: document.getElementById("message-text").value
    },
    function() {
      console.log("success");
    }
  );
});
