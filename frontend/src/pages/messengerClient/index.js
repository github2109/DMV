import { useState } from "react";
import { socket, connectSocket, joinRoomSocket } from "../../services/socket";
import "./style.css";
import messageService from "../../services/message";
import { useEffect } from "react";
const MessengerClient = () => {
  const [mess, setMess] = useState("");
  const [room, setRoom] = useState("");
  const [messageImages, setMessageImages] = useState([]);
  useEffect(() => {
    connectSocket();
    socket.on("receive_message", (data) => {
      console.log(data);
    });
  }, []);
  const sendMess = async () => {
    if (mess === "" && messageImages.length === 0) return;
    if (mess !== "") {
      const messSaved = await messageService.sendMessageFromClient(
        { content: mess, images: [] },
        room
      );
      socket.emit("send_message", { message: messSaved, deviceId: room });
    }
    if (messageImages.length > 0) {
      const messSaved = await messageService.sendMessageFromClient(
        { content: "", images: messageImages },
        room
      );
      socket.emit("send_message", { message: messSaved, deviceId: room });
    }
    setMessageImages([]);
    setMess("");
  };
  const joinRoom = () => {
    joinRoomSocket(room);
  };
  const handleSelectImage = (e) => {
    const images = [...e.target.files];
    setMessageImages([...messageImages, ...images]);
  };

  return (
    <div className="message-client-container">
      <input type="file" multiple="multiple" onChange={handleSelectImage} />

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
