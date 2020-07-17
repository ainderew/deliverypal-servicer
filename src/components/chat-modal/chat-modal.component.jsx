import React, { useState, useEffect } from "react";
import Styles from "./chat-modal.module.scss";
import { useSelector } from "react-redux";
import io from "socket.io-client";

//IMAGES
import closeIcon from "../../assets/close.svg";
//COMPONENTS
import UserMessage from "../user-message/user-message.component";
import CustomerMessage from "../customer-message/customer-message.component";

// const socket = io.connect("http://localhost:5000")
const socket = io.connect("https://delivery-pal.herokuapp.com/");

const ChatModal = ({ modalStatus, closeModal }) => {
  const orderData = useSelector(state => state.chatData);
  const [message, setMessage] = useState("");
  const [chatLog, setChatLog] = useState([]);

  const { name, location, id } = orderData;
  const initialMessage = "name: " + name + "\nlocation: " + location;

  const messageType = e => {
    setMessage(e.target.value);
  };

  const sendMessage = e => {
    e.preventDefault();
    socket.emit("roomMessage", orderData.id, "Delivery Pal", message);
    setMessage("");
  };

  useEffect(() => {
    socket.emit("join", {
      name: name,
      location: location,
      id: id,
    });
  }, []);
  useEffect(() => {
    socket.once("messageFromRoom", ({ name: name, message: message }) => {
      console.log("tester");
      setChatLog([
        ...chatLog,
        {
          name: name,
          message: message,
        },
      ]);
    });
  }, [chatLog]);
  return (
    <div className={Styles.container}>
      <div className={Styles.header}>
        <h1 className={Styles.headerName}>{name}</h1>
        <img
          onClick={closeModal}
          src={closeIcon}
          alt="close icon"
          className={Styles.headerClose}
        />
      </div>
      <div className={Styles.messageContainer}>
        <UserMessage message={initialMessage} />
        {chatLog.map((el, index) => {
          if (el.name === "Delivery Pal") {
            return <UserMessage message={el.message} />;
          } else {
            return <CustomerMessage name={el.name} message={el.message} />;
          }
        })}
      </div>
      <div className={Styles.inputContainer}>
        <form>
          <input
            value={message}
            onChange={messageType}
            className={Styles.input}
            name="chatInput"
          />
          <button
            onClick={sendMessage}
            className={Styles.btn}
            type="submit"></button>
        </form>
      </div>
    </div>
  );
};

export default ChatModal;
