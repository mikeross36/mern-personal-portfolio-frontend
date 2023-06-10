import { FaTimes } from "react-icons/fa";

const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return (
    <div className="user__badge-item" onClick={handleFunction}>
      {user.name}
      {admin === user._id && <span>(Admin)</span>}
      <FaTimes className="ms-1" />
    </div>
  );
};

export default UserBadgeItem;
