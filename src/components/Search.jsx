import React, { useContext, useState } from 'react'
import { collection, query, where, getDocs, setDoc, doc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { db } from '../firebase';
import {AuthContext} from "../context/AuthContext"

const Search = () => {

  const [username, setUserName] = useState("")
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(false)

  const {currentUser} = useContext(AuthContext);

  const handleSearch = async () =>{
    const q = query(collection (db, "users"), where ("displayName", "==", username ));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
    });
      
    } catch (err) {
      setErr(true)
    }
  };


  const handleKey = e => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //  check if the group (chats in firestore) exists, and else create new one if it doesn;t
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid 
    // dispatch({type: "CHANGE_USER", payload: u})
    try {
      
      const res = await getDoc(doc (db, "chats", combinedId))
      if (!res.exists()){
        // create a chat in chats collection
        await setDoc(doc (db, "chats", combinedId), {messages: [] });

        // create user chats
        await updateDoc(doc (db, "userChats",  currentUser.uid ), {
          [combinedId+".userInfo"]: {  //Variable+string together
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },   
          [combinedId+".date"]: serverTimestamp ()
        });


        await updateDoc(doc (db, "userChats",  user.uid ), {
          [combinedId+".userInfo" ]: {  //Variable+string together
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },   
          [combinedId+".date"]: serverTimestamp ()
        });

      }
    } catch (err) {}
    // create user chats 

    setUser(null)
    setUserName("")
  }

  return (
    <div className='search'>
        <div className="searchForm">
            <input type="text" placeholder='Find a user' onKeyDown={handleKey} onChange={e => setUserName(e.target.value)} value={username}/>
        </div>
        {err && <span>User not found!</span>}
        { user && <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
            <div className="userChatInfo">
                <span>{user.displayName}</span>
            </div>
        </div>}
    </div>
  )
}

export default Search