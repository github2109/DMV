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

io.on("connection", (socket) => {
  console.log("User :", socket.id);
});

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
