/* eslint-disable react-hooks/exhaustive-deps */
import "./style.css";
import avadefault from "../../images/avadefault.jpg";
import { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import {
  connectSocket,
  joinRoomSocket,
  authAdmin,
  socket,
} from "../../services/socket";
import { setListClientForMessenger } from "../../reducers/userReducer";
import {
  setMessagesByDeviceId,
  sendMessageFromAdmin,
  executedConvertationReceiveMessage,
} from "../../reducers/messageReducer";
import ScrollableFeed from "react-scrollable-feed";
import {
  formatDateForMessages,
  formatDateForListUser,
} from "../../services/formatDate";
const Messenger = (props) => {
  const [userSelect, setUserSelect] = useState(null);
  const [messageContent, setMessageContent] = useState("");
  const [messageImages, setMessageImages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    connectSocket();
    authAdmin();
    props.setListClientForMessenger();
  }, []);
  useEffect(() =>{
    messagesEndRef.current?.scrollToBottom();
  },[userSelect]);
  useEffect(() => {
    socket.on("receive_message", (data) => {
      props.executedConvertationReceiveMessage(data, props.users, userSelect);
    });
    return () => {
      socket.off("receive_message");
    };
  }, [props.users, userSelect]);
  const sendMessage = () => {
    if (messageContent === "" && messageImages.length === 0) return;
    if (messageContent !== "")
      props.sendMessageFromAdmin(
        { content: messageContent, images: [] },
        userSelect.deviceId,
        props.users
      );
    if (messageImages.length > 0)
      props.sendMessageFromAdmin(
        { content: null, images: messageImages },
        userSelect.deviceId,
        props.users
      );
    setMessageContent("");
    setMessageImages([]);
  };
  const handleSelectUser = (user) => {
    props.setMessagesByDeviceId(user.deviceId);
    setUserSelect(user);
    setMessageContent("");
    setMessageImages([]);
    joinRoomSocket(user.deviceId);
  };
  const handleSelectImage = (e) => {
    const images = [...e.target.files];
    setMessageImages([...messageImages, ...images]);
  };
  const handleRemoveImageMessage = (e, i) => {
    setMessageImages(messageImages.filter((image, index) => index !== i));
  };
  return (
    <div className="messenger-container">
      <div className="row clearfix">
        <div className="col-lg-12">
          <div className="card chat-app">
            <div id="plist" className="people-list">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-search"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                />
              </div>
              <ul className="list-unstyled chat-list mt-2 mb-0">
                {props.users.map((user) => (
                  <li
                    key={user._id}
                    className={
                      userSelect && user._id === userSelect._id
                        ? `clearfix active`
                        : `clearfix`
                    }
                    onClick={(e) => handleSelectUser(user)}
                  >
                    <img src={avadefault} alt="avatar" />
                    {(userSelect && user._id === userSelect._id) ||
                    user.recentMessage.isAdminSending ? (
                      <div className="about">
                        <div className="name">{user.deviceId}</div>
                        <div className="recent-message">
                          <span>
                            {user.recentMessage.images.length === 0
                              ? user.recentMessage.content
                              : "You send a image"}
                          </span>
                          <span> ·</span>
                          <span>
                            {formatDateForListUser(
                              user.recentMessage.createdAt
                            )}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="about">
                        <div className="name-client-sending">
                          {user.deviceId}
                        </div>
                        <div className="recent-message">
                          <span className="unseen-message">
                            {user.recentMessage.images.length === 0
                              ? user.recentMessage.content
                              : "You send a image"}
                          </span>
                          <span> ·</span>
                          <span>
                            {formatDateForListUser(
                              user.recentMessage.createdAt
                            )}
                          </span>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="chat">
              {userSelect && props.messages.length > 0 && (
                <div className="chat-history-container">
                  <div className="chat-header clearfix">
                    <div className="row">
                      <div className="col-lg-6">
                        <img src={avadefault} alt="avatar" />
                        <div className="chat-about">
                          <h6 className="m-b-0">{userSelect.deviceId}</h6>
                          <small>Last seen: 2 hours ago</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="chat-history">
                    <ul className="m-b-0">
                      <ScrollableFeed ref={messagesEndRef}>
                        {props.messages.map((message, index, messages) => {
                          let timeMessBefore, timeMessCurrent, timeMessAfter;
                          if (index > 0)
                            timeMessBefore =
                              new Date(
                                messages[index - 1].createdAt
                              ).getTime() / 1000;
                          timeMessCurrent =
                            new Date(messages[index].createdAt).getTime() /
                            1000;
                          if (index < messages.length - 1)
                            timeMessAfter =
                              new Date(
                                messages[index + 1].createdAt
                              ).getTime() / 1000;
                          return (
                            <li className="clearfix" key={message._id}>
                              {(index === 0 ||
                                (index > 0 &&
                                  timeMessCurrent - timeMessBefore >= 300)) && (
                                <div className="message-data">
                                  <span className="message-data-time">
                                    {formatDateForMessages(message.createdAt)}
                                  </span>
                                </div>
                              )}
                              {message.isAdminSending ? (
                                <div>
                                  {message.images.length > 0 && (
                                    <div>
                                      {message.images.map((image, i) => (
                                        <img
                                          key={i}
                                          src={image}
                                          alt="imgMess"
                                          className="message-image float-right"
                                        />
                                      ))}
                                    </div>
                                  )}
                                  {message.content && (
                                    <div className="message my-message float-right">
                                      {message.content}
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div className="other-message-container">
                                  <div className="avatar-other-message">
                                    {(index === messages.length - 1 ||
                                      messages[index + 1].isAdminSending ||
                                      (timeMessAfter &&
                                        timeMessAfter - timeMessCurrent >=
                                          300)) && (
                                      <img src={avadefault} alt="avatar" />
                                    )}
                                  </div>
                                  {message.images.length > 0 && (
                                    <div>
                                      {message.images.map((image, i) => (
                                        <img
                                          key={i}
                                          src={image}
                                          alt="imgMess"
                                          className="message-image"
                                        />
                                      ))}
                                    </div>
                                  )}
                                  {message.content && (
                                    <div className="message other-message">
                                      {message.content}
                                    </div>
                                  )}
                                </div>
                              )}
                            </li>
                          );
                        })}
                      </ScrollableFeed>
                    </ul>
                  </div>
                  <div className="chat-message clearfix">
                    <div className="input-group mb-0">
                      <div
                        className="input-group-prepend"
                        onClick={sendMessage}
                      >
                        <span className="input-group-text">
                          <i className="fa fa-send"></i>
                        </span>
                      </div>
                      <div className="input-container">
                        {messageImages.length > 0 && (
                          <div className="images-message-view">
                            {messageImages.map((image, i) => (
                              <div className="image-message-preview" key={i}>
                                <div
                                  className="image-message-remove"
                                  onClick={(e) =>
                                    handleRemoveImageMessage(e, i)
                                  }
                                >
                                  <i className="fa-solid fa-x"></i>
                                </div>
                                <div id="imageMesagePreview">
                                  <img
                                    src={URL.createObjectURL(image)}
                                    alt=""
                                    className="image-message"
                                  ></img>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter text here..."
                          value={messageContent}
                          onChange={(e) => setMessageContent(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") return sendMessage();
                          }}
                        />
                      </div>

                      <div className="input-images">
                        <input
                          type="file"
                          multiple="multiple"
                          id="imagesUpload"
                          onChange={handleSelectImage}
                          onClick={(event) => {
                            event.target.value = null;
                          }}
                        />
                        <label
                          className="fa-solid fa-image"
                          htmlFor="imagesUpload"
                        ></label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
    messages: state.messages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setListClientForMessenger: () => dispatch(setListClientForMessenger()),
    setMessagesByDeviceId: (deviceId) =>
      dispatch(setMessagesByDeviceId(deviceId)),
    sendMessageFromAdmin: (message, deviceId, users) =>
      dispatch(sendMessageFromAdmin(message, deviceId, users)),
    executedConvertationReceiveMessage: (data, users, userSelect) =>
      dispatch(executedConvertationReceiveMessage(data, users, userSelect)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Messenger);
