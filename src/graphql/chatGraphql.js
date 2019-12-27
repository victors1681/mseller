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
        fullName
        initials
        defaultColor
        firstName
        lastName
        avatar
        email
        phone
      }
      toUser {
        _id
        fullName
        initials
        defaultColor
        firstName
        lastName
        avatar
        email
        phone
      }
      image
      type
      name
      lastMessage {
        userId
        text
        status
        date
      }
      status
    }
  `,
};

export const GET_OPEN_CHATS = gql`
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
