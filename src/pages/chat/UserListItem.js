import Image from "react-bootstrap/Image";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <div className="user__list-item" onClick={handleFunction}>
      <Image src={user.photo} alt="searched users pic" />
      <div className="d-flex flex-column">
        <span>{user.name}</span>
        <span>{user.email}</span>
      </div>
    </div>
  );
};

export default UserListItem;
