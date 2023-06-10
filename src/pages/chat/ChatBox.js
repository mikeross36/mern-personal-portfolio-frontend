import SingleChat from "./SingleChat";
import { ChatState } from "../../context/ChatProvider";

const ChatBox = () => {
  const { selectedChat } = ChatState();

  return (
    <div className={`chat__box ${selectedChat && ""}`}>
      <SingleChat />
    </div>
  );
};

export default ChatBox;
