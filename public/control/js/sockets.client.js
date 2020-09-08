var socket = io(window.location.host + "?clientType=control");

var btnJoinRoom = document.getElementById("btnJoinRoom");
var btnReady = document.getElementById("btnReady");
var divControl = document.getElementById("divControl");
var btnUp = document.getElementById("btnUp");
var btnDown = document.getElementById("btnDown");

btnReady.style.visibility = "hidden";
divControl.style.visibility = "hidden";

btnJoinRoom.onclick = function () {
  var roomCode = document.getElementById("txtRoomCode").value;
  joinRoom(roomCode);
};

btnReady.onclick = function () {
  var roomCode = document.getElementById("txtRoomCode").value;
  setReady(roomCode);
};

btnUp.onclick = function () {
  setReady(roomCode);
};
btnDown.onclick = function () {
  setReady(roomCode);
};

//Listeners
socket.on("connect", function () {
  console.log("Conexión exitosa");
});
socket.on("onConnection", function (resp) {
  console.log("Server: " + resp.message);
});
socket.on("joinedToRoom", function (data) {
  if (data.state) {
    console.log("Joined to room");
    btnJoinRoom.style.visibility = "hidden";
    btnReady.style.visibility = "visible";
  }
});
socket.on("gameReady", function (data) {
  if (data.state) {
    console.log("Game Ready");
    btnReady.style.visibility = "hidden";
    divControl.style.visibility = "visible";
  }
});
//******************************************//

function joinRoom(room) {
  socket.emit("joinRoom", { room });
}

function setReady(room) {
  socket.emit("playerReady", { room });
  btnReady.style.visibility = "hidden";
}
function sendInput(command) {
  socket.emit("playerInput", { command });
}
