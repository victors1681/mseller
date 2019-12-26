import gql from 'graphql-tag';

export const messageFragments = {
  message: gql`
    fragment Message on Message {
      _id
      text
      type
      chatId
      user {
        _id
        name
        avatar
      }
      image
      video
      location
      status
      readDate
      receivedDate
      createdAt
    }
  `,
};

export const GET_CHAT_MESSAGES = gql`
  query get_chatMessages($chatId: ID!) {
    messages(chatId: $chatId) {
      ...Message
    }
  }
  ${messageFragments.message}
`;

export const MESSAGE_SUBSCRIPTION = gql`
  subscription($userId: ID, $listenForUserId: ID) {
    newMessageAdded(userId: $userId, listenForUserId: $listenForUserId) {
      ...Message
    }
  }
  ${messageFragments.message}
`;

export const ADD_CHAT_MESSAGE = gql`
  mutation addMessage($message: MessageInput) {
    addMessage(message: $message)
  }
`;
