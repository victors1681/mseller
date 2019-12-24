import gql from 'graphql-tag';

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
      lastMessage
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

// export const CHAT_SUBSCRIPTION = gql`
//   subscription {
//     newChatAdded {
//       ...Chat
//     }
//   }
//   ${chatFragments.chat}
// `;

export const CREATE_NEW_CHAT_ROOM = gql`
  mutation createChat($chat: ChatInput) {
    createChat(chat: $chat)
  }
`;
