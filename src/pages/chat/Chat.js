import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import MyChats from "./MyChats";
import ChatBox from "./ChatBox";

const Chat = () => {
  const userInfo = useSelector((state) => state.auth);

  return (
    <section className="chat section">
      {userInfo && <Sidebar />}
      <div className="chat__container">
        {userInfo && <MyChats />}
        {userInfo && <ChatBox />}
      </div>
    </section>
  );
};

export default Chat;
