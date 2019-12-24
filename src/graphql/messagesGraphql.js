import gql from 'graphql-tag';

export const messageFragments = {
  message: gql`
    fragment Message on Message {
      _id
      text
      type
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
  query get_chatMessages {
    messages {
      ...Message
    }
  }
  ${messageFragments.message}
`;

export const MESSAGE_SUBSCRIPTION = gql`
  subscription {
    newMessageAdded {
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
