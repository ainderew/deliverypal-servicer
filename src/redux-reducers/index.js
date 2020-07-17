import chatDataReducer from "./chat-data";
import {combineReducers} from "redux"

const allReducers = combineReducers({
    chatData: chatDataReducer
})

export default allReducers;