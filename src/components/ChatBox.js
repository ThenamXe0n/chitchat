import React, { useEffect, useState } from "react";
import "../Styles/ChatBox.css";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy
} from "firebase/firestore";
import { auth, db } from "../firebase-config";

const ChatBox = (props) => {
  const { room } = props;
  const [newMesssage, setNewMessage] = useState("");
  const [displayMessages, setDisplayMessages] = useState([]);

  const messageRef = collection(db, "messages");

  useEffect(() => {
    const queryMessage = query(messageRef, where("room", "==", room),orderBy("createdAt"));
    const unsubscribe = onSnapshot(queryMessage, (snapshot) => {
      let allMessages = [];
      snapshot.forEach((doc) => {
        allMessages.push({
          ...doc.data(),
          id: doc.id
        });
      });
      setDisplayMessages(allMessages);
    });
    return () => unsubscribe()
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMesssage === "") return;
    await addDoc(messageRef, {
      text: newMesssage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room: room,
      profile: auth.currentUser.photoURL,
    });
    console.log(displayMessages);
    setNewMessage("");
  };

  return (
    <div className="chatBox-screen">
      <div className="chatBox-Container">
        <div className="text-center">ChitChat Messenger</div>
        <div className="chat-area">
          {displayMessages.map((messages) => (
            <div className="chat-message" key={messages.id}>
              <div className={auth.currentUser.displayName === messages.user ? "sender" : "receiver"}>
                <span>
                  <img
                    src={messages.profile}
                    width="30px"
                    style={{ borderRadius: "10rem" }}
                    alt="userImg"
                  />
                </span>
                <div className="col"><p>{messages.text}</p> <p><small style={{color:"gray"}} >{messages.user}</small></p></div>
              </div>
            </div>
          ))}
        </div>
        <form className="chatbox-form" onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMesssage}
            placeholder="Enter New Message"
          />
          <button type="submit">Send ↩</button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
