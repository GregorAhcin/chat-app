let socket = io();

socket.on("connect", function() {
  console.log("Connected to server.");
});

socket.on("disconnect", function() {
  console.log("Server disconected.");
});

socket.on("newMessage", function(message) {
  var formatedTime = moment(message.createdAt).format("h:mm");
  var li = document.createElement("li");
  li.className = "collection-item";
  var liText = document.createTextNode(
    formatedTime + ": " + message.from + ": " + message.text
  );
  li.appendChild(liText);

  document.getElementById("messages").appendChild(li);
});

socket.on("newLocationMessage", function(message) {
  var formatedTime = moment(message.createdAt).format("h:mm");
  var li = document.createElement("li");
  li.className = "collection-item grey lighten-3";
  var a = document.createElement("a");
  a.href = message.url;
  a.target = "_blank";
  var aText = document.createTextNode("Link to my location.");
  var liText = document.createTextNode(
    formatedTime + ": " + message.from + ": "
  );
  li.appendChild(liText);
  a.appendChild(aText);
  li.appendChild(a);
  document.getElementById("messages").appendChild(li);
});

var form = document.getElementById("message-form");
form.addEventListener("submit", function(e) {
  e.preventDefault();

  var textMessage = document.getElementById("message-text");

  socket.emit(
    "newMessage",
    {
      from: "User",
      text: textMessage.value
    },
    function() {
      textMessage.value = "";
    }
  );
});

var locationButton = document.getElementById("send-location");
locationButton.addEventListener("click", function() {
  if (!navigator.geolocation) {
    return alert("Location not supported in this browser.");
  }
  locationButton.setAttribute("disabled", "");

  navigator.geolocation.getCurrentPosition(
    function(position) {
      locationButton.removeAttribute("disabled");
      socket.emit(
        "sendLocation",
        {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        },
        function() {
          locationButton.removeAttribute("disabled");
        }
      );
    },
    function(error) {
      locationButton.removeAttribute("disabled");
      alert("We cant get location data.");
    }
  );
});
