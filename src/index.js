import React from "react";
import ReactDOM from "react-dom";
import "./SCSS/global.style.scss";
import { createStore, combineReducers } from "redux";
import allReducers from "./redux-reducers/index";

import MainContainer from "./pages/1main-container/main-container.component";
import { Provider } from "react-redux";

const saveToLocalStorage = (state) =>{
  try{
    const usableState = JSON.stringify(state) 
    localStorage.setItem("state", usableState)
    
  }catch(err){
    console.log(err)
  }
}

const loadFromLocalStorage = () =>{
  try{
    const usableState = localStorage.getItem("state")
    if (usableState === null) return undefined;
    return JSON.parse(usableState)
  }catch(err){
    console.log(err)
    return undefined
  }
}

const presistedState = loadFromLocalStorage()

const store = createStore(
  allReducers,
  presistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
store.subscribe(() => saveToLocalStorage(store.getState()))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <MainContainer />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
