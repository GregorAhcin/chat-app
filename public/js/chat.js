let socket = io();

function deparam() {
  var pairsArray = window.location.search.substring(1).split("&");
  var obj = {};
  var pair, i;

  for (i in pairsArray) {
    if (pairsArray[i] === "") continue;
    pair = pairsArray[i].split("=");
    obj[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }
  return obj;
}

function scrollToBottom() {
  // Selectors
  var messages = document.getElementById("messages");
  var lastSpan = messages.lastChild;
  var newMessage = lastSpan.querySelector("li:last-child");
  // Heights
  var ch = messages.clientHeight;
  var st = messages.scrollTop;
  var sh = messages.scrollHeight;
  var newMh = newMessage.clientHeight;

  if (ch + st + newMh + newMh >= sh) {
    messages.scroll(0, sh);
  }
}

socket.on("connect", function() {
  var params = deparam();

  socket.emit("join", params, function(err) {
    if (err) {
      alert(err);
      window.location.href = "/";
    } else {
      console.log("hey");
    }
  });
});

socket.on("disconnect", function() {
  console.log("Server disconected.");
});

socket.on("newMessage", function(message) {
  var formatedTime = moment(message.createdAt).format("h:mm");

  var template = document.getElementById("message-template").innerHTML;
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formatedTime
  });
  var span = document.createElement("span");
  span.innerHTML = html;

  document.getElementById("messages").appendChild(span);
  scrollToBottom();

  // var li = document.createElement("li");
  // li.className = "collection-item";
  // var liText = document.createTextNode(
  //   formatedTime + ": " + message.from + ": " + message.text
  // );
  // li.appendChild(liText);

  // document.getElementById("messages").appendChild(li);
});

socket.on("newLocationMessage", function(message) {
  var formatedTime = moment(message.createdAt).format("h:mm");

  var template = document.getElementById("location-message-template").innerHTML;
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formatedTime
  });
  let span = document.createElement("span");
  span.innerHTML = html;

  document.getElementById("messages").appendChild(span);
  scrollToBottom();
  // var li = document.createElement("li");
  // li.className = "collection-item grey lighten-3";
  // var a = document.createElement("a");
  // a.href = message.url;
  // a.target = "_blank";
  // var aText = document.createTextNode("Link to my location.");
  // var liText = document.createTextNode(
  //   formatedTime + ": " + message.from + ": "
  // );
  // li.appendChild(liText);
  // a.appendChild(aText);
  // li.appendChild(a);
  // document.getElementById("messages").appendChild(li);
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
