import React from "react";
import Styles from "./customer-message.module.scss";

const CustomerMessage = ({ name, message }) => {
  return (
    <div className={Styles.container}>
      <h1 className={Styles.h1}>{name}</h1>
      <span className={Styles.span}>{message}</span>
    </div>
  );
};

export default CustomerMessage;
