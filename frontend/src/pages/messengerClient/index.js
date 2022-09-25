import { useState } from "react";
import { socket, connectSocket, joinRoomSocket } from "../../services/socket";
import "./style.css";
import messageService from "../../services/message";
import { useEffect } from "react";
const MessengerClient = () => {
  const [mess, setMess] = useState("");
  const [room, setRoom] = useState("");
  useEffect(() => {
    connectSocket();
    socket.on("receive_message", (data) => {
      console.log(data);
    });
  }, []);
  const sendMess = async () => {
    const messData = {
      content: mess,
      images: [],
    };
    const messSaved = await messageService.sendMessageFromClient(
      messData,
      room
    );
    socket.emit("send_message", { message: messSaved, deviceId: room });
  };
  const joinRoom = () => {
    joinRoomSocket(room);
  };
  return (
    <div className="message-client-container">
      <div className="message-client-joint">
        <input
          type="text"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <button onClick={joinRoom}>Join</button>
      </div>
      <div className="message-client-send">
        <input
          type="text"
          value={mess}
          onChange={(e) => setMess(e.target.value)}
        />
        <button onClick={sendMess}>Send</button>
      </div>
    </div>
  );
};

export default MessengerClient;
