import React, { useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import UserBadgeItem from "./UserBadgeItem";
import UserListItem from "./UserListItem";
import { api } from "../../utils/axiosConfig";
import { toast } from "react-toastify";

import { useSelector } from "react-redux";

const groupChatId = "groupChatId";

const GroupChat = ({ children }) => {
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [groupChatName, setGroupChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const { chats, setChats } = ChatState();

  const { userInfo } = useSelector((state) => state.auth);

  const handleShowGroupModal = () => {
    setShowGroupModal(true);
  };

  const handleHideGroupModal = () => {
    setShowGroupModal(false);
  };

  const handleSearchUser = async (query) => {
    setSearchTerm(query);
    if (!query) return;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await api.get(
        `/api/v1/users/search-users?search=${searchTerm}`,
        config
      );
      console.log(data);
      setSearchResults(data);
    } catch (err) {
      toast.error("Failed to get search results!", { toastId: groupChatId });
    }
    setSearchTerm("");
  };

  const handleAddUser = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast.error("User already added!", { toastId: groupChatId });
      return;
    }
    const addedUsers = [...selectedUsers, userToAdd];
    setSelectedUsers(addedUsers);
  };

  const handleDeleteUser = (userToDel) => {
    const remainedUsers = selectedUsers.filter((selUser) => {
      return selUser._id !== userToDel._id;
    });
    setSelectedUsers(remainedUsers);
  };

  const handleCreateGroupChat = async () => {
    if (!groupChatName || !selectedUsers) {
      toast.error("All the fields are mandatory!", { toastId: groupChatId });
      return;
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await api.post(
        "/api/v1/chats/group-chat",
        {
          groupChatName: groupChatName,
          users: JSON.stringify(selectedUsers.map((selUser) => selUser._id)),
        },
        config
      );
      console.log(data);
      setChats([data, ...chats]);
      handleHideGroupModal();
      toast.success("New group chat created!", { toastId: groupChatId });
    } catch (err) {
      toast.error("Failed to create group chat!");
    }
  };

  return (
    <>
      <span onClick={handleShowGroupModal}>{children}</span>
      <Modal show={showGroupModal} onHide={handleHideGroupModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create Group Chat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="name-input">
              <Form.Control
                type="text"
                placeholder="chat name..."
                style={{ maxWidth: "90%" }}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="user-input">
              <Form.Control
                type="text"
                placeholder="add user..."
                style={{ maxWidth: "90%" }}
                onChange={(e) => handleSearchUser(e.target.value)}
              />
            </Form.Group>
          </Form>
          <div className="d-flex flex-wrap gap-1 w-100">
            {selectedUsers?.map((selUser) => {
              return (
                <UserBadgeItem
                  key={selUser._id}
                  user={selUser}
                  handleFunction={() => handleDeleteUser(selUser)}
                />
              );
            })}
          </div>
          {searchResults?.slice(0, 4).map((searchUser) => {
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
          <Button variant="outline-primary" onClick={handleCreateGroupChat}>
            Create Chat
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GroupChat;
