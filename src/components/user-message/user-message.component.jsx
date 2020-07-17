import React from "react";
import Styles from "./user-message.module.scss";

const UserMessage = ({message}) => {
  return (
    <div className={Styles.container}>
      {/* <h1 className={Styles.h1}>{name}</h1> */}
      <p className={Styles.span}>{message}</p>
    </div>
  );
};

export default UserMessage;