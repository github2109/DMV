const http = require("http");
const app = require("./app");

const config = require("./utils/config");
const logger = require("./utils/logger");

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
let clientDeviceId = [];
let idSocketAdmin;
io.on("connection", (socket) => {
  console.log("User :", socket.id);
  socket.on("join_room", (data) => {
    socket.join(data);
    if(!clientDeviceId.includes(data)) clientDeviceId.push(data);
    handleClientJoinRoom(data);
  });
  socket.on("auth_admin", (data) => {
    idSocketAdmin = socket.id;
    clientDeviceId.forEach((deviceId) => {
      socket.join(deviceId);
    });
  });
  socket.on("send_message", (data) => {
    socket.to(data.deviceId).emit("receive_message", data);
  });
});

const handleClientJoinRoom = (deviceId) => {
  if (idSocketAdmin) io.sockets.sockets.get(idSocketAdmin).join(deviceId);
};

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
