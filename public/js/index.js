let socket = io();

socket.on("connect", function() {
  console.log("Connected to server.");
});

socket.on("disconnect", function() {
  console.log("Server disconected.");
});

socket.on("newMessage", function(message) {
  var li = document.createElement("li");
  li.className = "collection-item";
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

var locationButton = document.getElementById("send-location");
locationButton.addEventListener("click", function() {
  if (!navigator.geolocation) {
    return alert("Location not supported in this browser.");
  }
  navigator.geolocation.getCurrentPosition(
    function(position) {
      socket.emit(
        "sendLocation",
        {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        },
        function() {
          console.log("success send location");
        }
      );
    },
    function(error) {
      alert("We cant get location data.");
    }
  );
});
