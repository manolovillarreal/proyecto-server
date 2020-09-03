const { io } = require("./server");
const crypto = require("crypto");

const ClientTypes = {
  game: "game",
  control: "control",
};

let rooms = [];
let roomsPerClients = {};

io.on("connection", (client) => {
  let clientType = client.handshake.query.clientType;

  console.log("Nueva Conexión de tipo :" + clientType);

  client.emit("onConnection", {
    message: "Bienvenido al servidor",
  });

  client.on("createRoom", (roomOptions) => {
    let exist = true;
    let room;
    do {
      room = crypto.randomBytes(3).toString("hex").toUpperCase();
      exist = rooms.includes(room);
    } while (exist);

    rooms.push(room);
    client.join(room);

    console.log("Room created: " + room);

    client.emit("roomCreated", { room });
  });

  client.on("joinRoom", (data) => {
    let room = data.room;
    if (!rooms.includes(room)) {
      client.emit("joinedToRoom", { state: false });
      return;
    }

    roomsPerClients[client.id] = room;
    client.join(room);
    console.log("Player Enter Room " + room);

    client.emit("joinedToRoom", { state: true });
    io.to(data.room).emit("playerEnter", { playerId: client.id });
  });

  client.on("playerReady", () => {
    client
      .to(roomsPerClients[client.id])
      .emit("playerReady", { playerId: client.id });
  });

  client.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
  client.on("playerInput", (data) => {
    let room = roomsPerClients[client.id];
    console.log("player Input: " + data.command + " To " + room);
    client
      .to(room)
      .emit("playerInput", { playerId: client.id, command: data.command });
  });
});

let input = {
  playerId: "",
  command: "up",
};
