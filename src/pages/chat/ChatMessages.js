import ScrollableFeed from "react-scrollable-feed";
import {
  isSameSender,
  isLastMessage,
  isSameSenderMargin,
  isSameUser,
} from "../../utils/chatLogic";
import Badge from "react-bootstrap/Badge";
import Image from "react-bootstrap/Image";

import { useSelector } from "react-redux";

const ChatMessages = ({ messages }) => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((currMessage, idx) => {
          return (
            <div
              key={currMessage._id}
              className="d-flex align-items-center gap-1"
            >
              {(isSameSender(messages, currMessage, idx, userInfo.user._id) ||
                isLastMessage(messages, idx, userInfo.user._id)) && (
                <Badge pill bg="light">
                  <Image
                    src={currMessage.sender.photo}
                    alt="sender pic"
                    style={{ width: "25px", cursor: "pointer" }}
                  />
                </Badge>
              )}
              <span
                style={{
                  backgroundColor: `${
                    currMessage.sender._id === userInfo.user._id
                      ? "#BEE3F8"
                      : "#B9F5D0"
                  }`,
                  marginLeft: isSameSenderMargin(
                    messages,
                    currMessage,
                    idx,
                    userInfo.user._id
                  ),
                  marginTop: isSameUser(messages, currMessage, idx) ? 3 : 10,
                  borderRadius: "10px",
                  padding: "3px 5px",
                  maxWidth: "75%",
                }}
              >
                {currMessage.content}
              </span>
            </div>
          );
        })}
    </ScrollableFeed>
  );
};

export default ChatMessages;
