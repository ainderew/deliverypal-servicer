import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Styles from "./main-container.module.scss";


//PAGES
import HomePage from "../page-home/home.component";
import ChatPage from "../page-chat/chat.component";

const MainContainer = () => {
  return (
    <Router>
      <div className={Styles.container}>
          <Switch>
              <Route path="/" exact component ={HomePage} />
              <Route path="/chat" exact component ={ChatPage} />
          </Switch>
      </div>
    </Router>
  );
};

export default MainContainer;
