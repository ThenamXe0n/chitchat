import "./App.css";
import Auth from "./components/Auth";
import { useRef, useState } from "react";
import Cookies from "universal-cookie";
import ChatBox from "./components/ChatBox";
const cookies = new Cookies();
function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);

  const RoomInputRef = useRef(null);

  if (!isAuth) {
    return (
      <div className="App">
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }
  return (
    <div>
      {room ? (
        <>
          <ChatBox room={room} />
        </>
      ) : (
        <div className="room">
          <div className="container">
            <label>Enter Chat Room name: </label>
            <input ref={RoomInputRef} type="text" />
            <button onClick={() => setRoom(RoomInputRef.current.value)}>
              Enter Chat
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
