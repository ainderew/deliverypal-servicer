const chatDataReducer = (state="", action) =>{
    switch (action.type){
        case "chatData":
            state = action.chatData
            return state;
        default:
            return state;
    }
}

export default chatDataReducer;