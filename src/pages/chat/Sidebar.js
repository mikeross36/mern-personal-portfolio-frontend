import {
  Button,
  Dropdown,
  Badge,
  Image,
  Form,
  InputGroup,
  Offcanvas,
} from "react-bootstrap";
import { api } from "../../utils/axiosConfig";
import { FaSistrix, FaBell } from "react-icons/fa";
import { useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../../features/auth/authApiSlice";
import { logOut } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import { getSender } from "../../utils/chatLogic";
import UserProfile from "./UserProfile";
import UserListItem from "./UserListItem";

const sidebarId = "sidebarId";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const { notification, setNotification, setSelectedChat, chats, setChats } =
    ChatState();

  const handleShowSidebar = () => {
    setShowSidebar(true);
  };

  const handleHideSidebar = () => {
    setShowSidebar(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutUser] = useLogoutUserMutation();

  const handleUserLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logOut());
      navigate("/");
    } catch (err) {
      toast.error(err, { toastId: sidebarId });
    }
  };

  const handleSearchUsers = async (e) => {
    e.preventDefault();
    if (!searchTerm) {
      toast.warning("Please enter search term!", { toastId: sidebarId });
      return;
    }
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
      setSearchResults(data);
      // console.log(data);
    } catch (err) {
      toast.error("Failed to perform search", { toastId: sidebarId });
    }
    setSearchTerm("");
  };

  const createChat = async (userId) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await api.post(
        "/api/v1/chats/create-chat",
        { userId },
        config
      );
      handleHideSidebar();
      // console.log(data);
      if (!chats.find((chat) => chat._id === data._id)) {
        setChats([...chats, data]);
      } else {
        setSelectedChat(data);
      }
    } catch (err) {
      toast.error("Cannot create the chat!", { toastId: sidebarId });
    }
  };

  return (
    <>
      <div className="chat__sidebar">
        <Button
          variant="outline-primary"
          id="button-addon2"
          size="sm"
          className="py-2"
          onClick={handleShowSidebar}
        >
          <FaSistrix size={10} /> Search user
        </Button>
        <h5 className="text-center">Let's Chat</h5>
        <Dropdown>
          <Dropdown.Toggle
            variant="outline-primary"
            id="dropdown-basic"
            className="d-flex align-items-center gap-1"
            size="sm"
          >
            <FaBell />
            <Badge bg="danger">{notification.length}</Badge>
            <Image
              src={userInfo?.user?.photo}
              className="me-3"
              style={{ width: "30px", borderRadius: "50%" }}
            />
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ fontSize: "14px" }}>
            <Dropdown.Item>
              {!notification.length && "No new message"}
              {notification.map((newMessage) => {
                return (
                  <article
                    key={newMessage._id}
                    onClick={() => {
                      setSelectedChat(newMessage.chat);
                      setNotification(
                        notification.filter((message) => message !== newMessage)
                      );
                    }}
                  >
                    {newMessage.chat.isGroupChat
                      ? `New message in ${newMessage.chat.chatName}`
                      : `New message from ${getSender(
                          userInfo?.user,
                          newMessage.chat.users
                        )}`}
                  </article>
                );
              })}
            </Dropdown.Item>
            <UserProfile user={userInfo?.user}>
              <Dropdown.Item>My Profile</Dropdown.Item>
            </UserProfile>
            <Dropdown.Item onClick={handleUserLogout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <Offcanvas show={showSidebar} onHide={handleHideSidebar}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Search Users</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form className="mb-3" onClick={handleSearchUsers}>
            <InputGroup>
              <Form.Control
                placeholder="Vladimir or other..."
                aria-label="search users..."
                aria-describedby="basic-addon2"
                style={{ maxWidth: "16rem" }}
                name="searchTerm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button
                type="submit"
                variant="outline-primary"
                id="button-addon2"
              >
                GO
              </Button>
            </InputGroup>
          </Form>
          {searchResults?.map((searchUser) => {
            return (
              <UserListItem
                key={searchUser._id}
                user={searchUser}
                handleFunction={() => createChat(searchUser._id)}
              />
            );
          })}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Sidebar;
