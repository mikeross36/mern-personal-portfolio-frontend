export const getSender = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

export const getSenderFull = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};

export const isSameSender = (messages, currMessage, idx, userId) => {
  return (
    idx < messages.length - 1 &&
    (messages[idx + 1].sender._id !== currMessage.sender._id ||
      messages[idx + 1].sender._id === undefined) &&
    messages[idx].sender._id !== userId
  );
};

export const isLastMessage = (messages, idx, userId) => {
  return (
    idx === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const isSameSenderMargin = (messages, currMessage, idx, userId) => {
  if (
    idx < messages.length - 1 &&
    messages[idx + 1].sender._id === currMessage.sender._id &&
    messages[idx].sender._id !== userId
  )
    return 33;
  else if (
    (idx < messages.length - 1 &&
      messages[idx + 1].sender._id !== currMessage.sender._id &&
      messages[idx].sender._id !== userId) ||
    (idx === messages.length - 1 && messages[idx].sender._id !== userId)
  )
    return 0;
  else return "auto";
};

export const isSameUser = (messages, currMessage, idx) => {
  return idx > 0 && messages[idx - 1].sender._id !== currMessage.sender._id;
};
