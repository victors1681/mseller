import gql from 'graphql-tag';
import {UserBasicInfoFragments} from './userGraphql';

export const chatFragments = {
  chat: gql`
    fragment Chat on Chat {
      _id
      from
      to
      fromUser {
        _id
        name
        firstName
        lastName
        avatar
        email
      }
      toUser {
        _id
        name
        firstName
        lastName
        avatar
        email
      }
      image
      type
      name
      lastMessageUserId
      lastMessage
      lastMessageStatus
      status
    }
  `,
};

export const GET_CHAT_MESSAGES = gql`
  query get_Chats {
    chats {
      ...Chat
    }
  }
  ${chatFragments.chat}
`;

export const GET_BUSINESS_CHAT_USERS = gql`
  query usersChat {
    usersChat {
      ...UserBasicInfo
    }
  }
  ${UserBasicInfoFragments.UserBasicInfo}
`;

export const CREATE_NEW_CHAT_ROOM = gql`
  mutation createChat($chat: ChatInput) {
    createChat(chat: $chat)
  }
`;
export const CHANGE_CHAT_STATUS = gql`
  mutation changeChatStatus($chatId: ID, $status: String) {
    changeChatStatus(chatId: $chatId, status: $status)
  }
`;
