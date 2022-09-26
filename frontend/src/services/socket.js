import io from "socket.io-client";
import { token } from "./token";
export let socket;
export const connectSocket = () => {
  socket = io.connect("http://localhost:3000");
};

export const authAdmin = () => {
  socket.emit("auth_admin",token);
}

export const joinRoomSocket = (room) => {
  if (room !== "") {
    socket.emit("join_room", room);
  }
};
