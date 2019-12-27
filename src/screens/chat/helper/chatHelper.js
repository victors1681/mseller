import get from 'lodash/get';

export const getLastMessageInfo = lastMessage => {
  const lastMessageUserId = get(lastMessage, 'userId', '');
  const lastMessageText = get(lastMessage, 'text', '');
  const lastMessageStatus = get(lastMessage, 'status', '');
  const lastMessageDate = get(lastMessage, 'date', null);

  return {
    lastMessageUserId,
    lastMessageText,
    lastMessageStatus,
    lastMessageDate,
  };
};

export const findReceptorAndEmitter = ({from, to}, userId) => ({
  from: userId === from ? to : from,
  to: userId === to ? from : to,
});

export const findReceptorAndEmitterFullObj = ({fromUser, toUser}, userId) => ({
  fromUser: userId === fromUser._id ? fromUser : toUser,
  toUser: userId !== toUser._id ? toUser : fromUser,
});
