import React, { useState, useEffect } from "react";
import {useHistory} from "react-router-dom"
import {useDispatch} from "react-redux"
import {getChatData} from "../../redux-action";
import io from "socket.io-client";
import Styles from "./home.module.scss";

//COMPONENTS
import ChatModal from "../../components/chat-modal/chat-modal.component"

// const socket = io.connect("http://localhost:5000");
const socket = io.connect("https://delivery-pal.herokuapp.com/");


const HomePage = () => {
  let dispatch = useDispatch()
  const history = useHistory();
  const [orders, setOrders] = useState([]);
  const [background, setBackground] = useState(false)
  const [modalStatus, setModalStatus] = useState(false)

socket.on("order", ({name, location, id, order}) => {
  // console.log(orders);
  setOrders([...orders, {
    name: name,
    location: location,
    id: id,
    order: order
  }]);
  console.log(orders)
});

  //FUNCTIONS
const openChat = (name, location, id) =>{
  const data = {
    name: name,
    location: location,
    id: id
  }
  dispatch(getChatData(data))
  setBackground(true)
  setModalStatus(true)
  
}

const close = () =>{
  setModalStatus(false)
  setBackground(false)
}





  return (
    <div className={Styles.screen}>
      {modalStatus ? <ChatModal closeModal={close} />: null}
      <div className={(background) ? Styles.blur : Styles.container}>
        {orders.map((el,index) => {
          return (
            <div key={index}>
              <h1>Customer Name: {el.name}</h1>
              <h1>Location: {el.location}</h1>
              <h1>{el.id}</h1>
              <h1 className={el.name}>{el.order.restaurantName}</h1>
              {el.order.orders.map(el =>{
                return(
                  <div className={Styles.orderContainer}>
                   <h1>Order: {el.name}</h1>
                   <h1>Price: Php{el.price}</h1>
                   <h1>Quantity: {el.orderQuantity}</h1>
                </div>
                )
                
              })}
              <button onClick={()=> openChat(el.name,el.location,el.id)}>Chat</button>
            </div>
          );
        })}
      </div>
      
      
    </div>
  );
};

export default HomePage;
