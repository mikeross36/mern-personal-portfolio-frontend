import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

const UserProfile = ({ user, children }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {children ? (
        <span onClick={handleShowModal}>{children}</span>
      ) : (
        <FaEye
          style={{ cursor: "pointer" }}
          size={24}
          onClick={handleShowModal}
        />
      )}
      <Modal
        show={showModal}
        onHide={handleHideModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{user?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column align-items-center justify-content-between">
          <Image
            src={user?.photo}
            alt="user profile pic"
            style={{ width: "100px" }}
          />
          <span>{user?.email}</span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleHideModal}>
            close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserProfile;
