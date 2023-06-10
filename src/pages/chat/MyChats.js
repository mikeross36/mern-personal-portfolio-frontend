import React, { useState, useEffect } from "react";
import { ChatState } from "../../context/ChatProvider";
import Button from "react-bootstrap/Button";
import { FaPlus } from "react-icons/fa";
import { getSender } from "../../utils/chatLogic";
import { toast } from "react-toastify";
import { api } from "../../utils/axiosConfig";
import GroupChat from "./GroupChat";

import { useSelector } from "react-redux";

const myChatsId = "myChatsId";

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();

  const { chats, setChats, selectedChat, setSelectedChat, fetchAgain } =
    ChatState();
  const { userInfo } = useSelector((state) => state.auth);
  // console.log(userInfo);

  const getChats = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await api.get("/api/v1/chats", config);
      // console.log(data);
      setChats(data);
    } catch (err) {
      toast.error("Failed to load the chats!", { toastId: myChatsId });
    }
  };

  useEffect(() => {
    setLoggedUser(userInfo);
    // console.log(loggedUser);
    getChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchAgain]);

  return (
    <div className={`my__chats ${selectedChat && ""}`}>
      <div className="my__chats-header">
        <div className="mb-2">
          <GroupChat>
            <Button size="sm" variant="outline-primary">
              <FaPlus size={8} /> New Group Chat
            </Button>
          </GroupChat>
        </div>
        <h6>My Chats</h6>
      </div>
      <div className={`chats__container ${selectedChat && "selectedChat"}`}>
        {chats ? (
          chats?.map((chat) => {
            return (
              <article
                key={chat._id}
                className={selectedChat === chat ? "selectedChat" : ""}
                onClick={() => setSelectedChat(chat)}
              >
                <span>
                  <b>
                    {!chat.isGroupChat
                      ? getSender(loggedUser?.user, chat.users)
                      : chat.chatName}
                  </b>
                </span>
                {chat.latestMessage && (
                  <menu className="latest__message">
                    <span>{`${chat.latestMessage.sender.name}:`}</span>
                    <br />
                    <span>
                      {chat.latestMessage.content.length > 50
                        ? chat.latestMessage.content.substring(0, 51) + "..."
                        : chat.latestMessage.content}
                    </span>
                  </menu>
                )}
              </article>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default MyChats;
