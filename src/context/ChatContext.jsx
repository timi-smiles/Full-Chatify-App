import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext();


// using context api
export const ChatContextProvider = ({children}) =>{
    const { currentUser } = useContext(AuthContext);

    // Using user reducer
   const INITIAL_STATE = {
    chatId: "null",
    user:{},
   };

   const chatReducer = (state, action) => {
    switch(action.type){
        case "CHANGE_USER":
            return{
                user: action.payload,
                chatId: currentUser.uid > action.payload.uid ? currentUser.uid + action.payload.uid : action.payload.uid + currentUser.uid,  
            }
            default:
                return state;
    }
   };
    // To update the chat box and uer ID
   const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)

    return(
    <ChatContext.Provider value={{data: state, dispatch}}>
        {children}
    </ChatContext.Provider>
    );
};