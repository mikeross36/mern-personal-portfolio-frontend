import React, { useEffect, useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import io from "socket.io-client";
import { api } from "../../utils/axiosConfig";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getSender, getSenderFull } from "../../utils/chatLogic";
import UserProfile from "./UserProfile";
import UpdateGroupChat from "./UpdateGroupChat";
import ChatMessages from "./ChatMessages";
import Lottie from "react-lottie";
import animationData from "../../utils/typing.json";

import { useSelector } from "react-redux";

const ENDPOINT = "https://vladimir-monarov-portfolio-api.onrender.com/";
let socket, selectedChatCopy;

const singleChatId = "singleChatId";

const SingleChat = () => {
  const [socketConnected, setSocketConnected] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [typing, setTyping] = useState(false);

  const {
    notification,
    setNotification,
    fetchAgain,
    setFetchAgain,
    selectedChat,
  } = ChatState();

  const { userInfo } = useSelector((state) => state.auth);
  // console.log(userInfo);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", userInfo?.user?._id);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop-typing", () => setIsTyping(false));
    socket.off("setup", () => setSocketConnected(false));
  }, [userInfo]);

  useEffect(() => {
    socket.on("message-received", (newMessageReceived) => {
      if (
        !selectedChatCopy ||
        selectedChatCopy._id !== newMessageReceived.chat._id
      ) {
        if (!notification.includes(newMessageReceived)) {
          setNotification([newMessageReceived, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  const getChatMessages = async () => {
    if (!selectedChat) return;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      setLoading(true);
      const { data } = await api.get(
        `/api/v1/messages/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);
      socket.emit("join-chat", selectedChat._id);
    } catch (err) {
      toast.error("Failed to get chat messages!", { toastId: singleChatId });
    }
  };

  useEffect(() => {
    getChatMessages();
    selectedChatCopy = selectedChat;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChat]);

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    const timerLength = 3000;

    const timer = setTimeout(() => {
      const timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit("stop-typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
    return () => {
      clearTimeout(timer);
    };
  };

  const sendNewMessage = async (e) => {
    e.preventDefault();
    socket.emit("stop-typing", selectedChat._id);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      setNewMessage("");
      const { data } = await api.post(
        "/api/v1/messages/send-message",
        { content: newMessage, chatId: selectedChat._id },
        config
      );
      // console.log(data);
      socket.emit("new-message", data);
      setMessages([...messages, data]);
    } catch (err) {
      toast.error("Faild to send the message!", { toastId: singleChatId });
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      {selectedChat ? (
        <>
          {messages &&
            (!selectedChat.isGroupChat ? (
              <div
                className="d-flex justify-content-center gap-2 w-100"
                style={{ color: "#bfbfbf" }}
              >
                <span style={{ color: "#bfbfbf", marginRight: ".5rem" }}>
                  {getSender(userInfo?.user, selectedChat.users)}
                </span>
                <UserProfile
                  user={getSenderFull(userInfo?.user, selectedChat.users)}
                />
              </div>
            ) : (
              <>
                <span style={{ color: "#bfbfbf", fontSize: "14px" }}>
                  {selectedChat.chatName.toUpperCase()}
                </span>
                <UpdateGroupChat getChatMessages={getChatMessages} />
              </>
            ))}
          <div className="messages__container">
            <div className="messages">
              <ChatMessages messages={messages} />
            </div>
            <Form className="w-100" onSubmit={sendNewMessage}>
              {isTyping ? (
                <div className="d-inline-flex">
                  <Lottie options={defaultOptions} width={70} />
                </div>
              ) : (
                <></>
              )}
              <Form.Group className="d-flex mt-3">
                <Form.Control
                  type="text"
                  placeholder="enter a message..."
                  value={newMessage}
                  onChange={handleTyping}
                />
                <Button type="submit" variant="outline-success" size="sm">
                  send
                </Button>
              </Form.Group>
            </Form>
          </div>
        </>
      ) : (
        <div className="d-flex align-items-center justify-content-center text-center h-100">
          <h3 style={{ color: "#bfbfbf" }}>Click on user to start the chat</h3>
        </div>
      )}
    </>
  );
};

export default SingleChat;
