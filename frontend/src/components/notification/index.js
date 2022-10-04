/* eslint-disable react-hooks/exhaustive-deps */
import "./style.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Notification = ({ handleTokenExpired }) => {
  const notification = useSelector((state) => state.responseUI.notification);
  const isErrorNotification = useSelector((state) => state.responseUI.isErrorNotification);
  useEffect(() => {
    if (notification === "Token expired") {
      handleTokenExpired();
    }
  }, [notification]);
  if (!notification) return null;
  if (!isErrorNotification)
    return (
      <div className="Message Message--green">
        <div className="Message-icon">
          <i className="fa fa-check"></i>
        </div>
        <div className="Message-body">
          <p>{notification}</p>
        </div>
      </div>
    );
  else
    return (
      <div className="Message Message--red">
        <div className="Message-icon">
          <i className="fa fa-times"></i>
        </div>
        <div className="Message-body">
          <p>{notification}</p>
        </div>
      </div>
    );
};
export default Notification;
