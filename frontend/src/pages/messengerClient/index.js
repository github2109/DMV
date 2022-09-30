import { useState } from "react";
import { socket, connectSocket, joinRoomSocket } from "../../services/socket";
import "./style.css";
import messageService from "../../services/message";
import { useEffect } from "react";
import * as XLSX from "xlsx";
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
  const readExcel =  (e) => {
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(e.target.files[0]);
    fileReader.onload = async (e) => {
      const bufferArray = e.target.result;
      const wb = XLSX.read(bufferArray, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      console.log(ws);
      const data = await XLSX.utils.sheet_to_json(ws);
      console.log(data);
    };

    // readXlsxFile(e.target.files[0]).then((row) => {
    //   console.log(row);
    // })
  };
  const readImages = (e) => {
    for(let i =0;i<e.target.files.length;i++){
      if(e.target.files[i].name.split(".")[0] === "0") console.log(e.target.files[i]);
    }
  }
  return (
    <div className="message-client-container">
      <input type="file" onChange={readExcel} />
      <input directory="" webkitdirectory="true" type="file"  onChange={readImages}/>

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
