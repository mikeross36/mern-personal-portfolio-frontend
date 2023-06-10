import React, { useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { FaEye } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import UserBadgeItem from "./UserBadgeItem";
import UserListItem from "./UserListItem";
import { toast } from "react-toastify";
import { api } from "../../utils/axiosConfig";

import { useSelector } from "react-redux";

const updateGroupId = "updateGroupId";

const UpdateGroupChat = ({ getChatMessages }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [groupChatName, setGroupChatName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { selectedChat, setSelectedChat, fetchAgain, setFetchAgain } =
    ChatState();
  const { userInfor } = useSelector((state) => state.auth);

  const handleShowUpdateModal = () => {
    setShowUpdateModal(true);
  };

  const handleHideUpdateModal = () => {
    setShowUpdateModal(false);
  };

  const handleRemoveUser = async (userToRemove) => {
    if (
      userInfor.user._id !== selectedChat.groupAdmin._id &&
      userInfor.user._id !== userToRemove._id
    ) {
      toast.error("You do not have the permission to remove a user!", {
        toastId: updateGroupId,
      });
      return;
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfor.token}`,
        },
      };
      const { data } = await api.patch(
        "/api/v1/chats/remove-user",
        { chatId: selectedChat._id, userId: userToRemove._id },
        config
      );
      userToRemove._id === userInfor.user._id
        ? setSelectedChat()
        : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      getChatMessages();
    } catch (err) {
      toast.error("Failed to remove user!", { toastId: updateGroupId });
    }
  };

  const handleRenameGroup = async () => {
    if (!groupChatName) return;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfor.token}`,
        },
      };
      const { data } = await api.patch(
        "/api/v1/chats/rename-chat",
        { chatId: selectedChat._id, chatName: groupChatName },
        config
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
    } catch (err) {
      toast.error("Failed to rename the chat!", { toastId: updateGroupId });
    }
  };

  const handleSearchUsers = async (query) => {
    setSearchTerm(query);
    if (!query) return;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfor.token}`,
        },
      };
      const { data } = await api.get(
        `/api/v1/users/search-users?search=${searchTerm}`,
        config
      );
      setSearchResults(data);
      // console.log(data);
    } catch (err) {
      toast.error("Failed to get search results!", { toastId: updateGroupId });
    }
  };

  const handleAddUser = async (userToAdd) => {
    if (selectedChat.users.find((chatUser) => chatUser._id === userToAdd._id)) {
      toast.error("User is already in the group!", { toastId: updateGroupId });
      return;
    } else if (userInfor.user._id !== selectedChat.groupAdmin._id) {
      toast.error("You do not have permission to add a user!", {
        toastId: updateGroupId,
      });
      return;
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfor.token}`,
        },
      };
      const { data } = await api.patch(
        "/api/v1/chats/add-user",
        { chatId: selectedChat._id, userId: userToAdd._id },
        config
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
    } catch (err) {
      toast.error("Failed to add a user!", { toastId: updateGroupId });
    }
  };

  return (
    <>
      <span onClick={handleShowUpdateModal}>
        <FaEye style={{ cursor: "pointer", color: "#bfbfbf" }} size={24} />
      </span>
      <Modal show={showUpdateModal} onHide={handleHideUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedChat.chatName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-wrap gap-1 w-100 mb-1">
            {selectedChat.users.map((chatUser) => {
              return (
                <UserBadgeItem
                  key={chatUser._id}
                  user={chatUser}
                  admin={selectedChat.groupAdmin}
                  handleFunction={() => handleRemoveUser(chatUser)}
                />
              );
            })}
          </div>
          <Form>
            <Form.Group className="d-flex gap-1 mb-3" controlId="input1">
              <Form.Control
                type="text"
                placeholder="chat name..."
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="outline-success"
                size="sm"
                onClick={handleRenameGroup}
              >
                Rename
              </Button>
            </Form.Group>
            <Form.Group className="mb-3" controlId="input2">
              <Form.Control
                type="text"
                placeholder="add user to group..."
                style={{ width: "95%" }}
                onChange={(e) => handleSearchUsers(e.target.value)}
              />
            </Form.Group>
          </Form>
          {searchResults?.map((searchUser) => {
            return (
              <UserListItem
                key={searchUser._id}
                user={searchUser}
                handleFunction={() => handleAddUser(searchUser)}
              />
            );
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => handleRemoveUser(userInfor.user)}
          >
            Leave Group
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateGroupChat;
