import gql from 'graphql-tag';

export const UserInfoFragments = {
  userInfo: gql`
    fragment UserInfo on User {
      token
      _id
      firstName
      lastName
      email
      avatar
      phone
      sellerCode
      mode
      business {
        name
        lang
        dbName
        phone
        address
        country
      }
    }
  `,
};

export const GET_USER_BY_ID = gql`
  query getUserInfo($id: ID) {
    user(id: $id) {
      ...UserInfo
    }
  }
  ${UserInfoFragments.userInfo}
`;

export const UPDATE_CURRENT_USER = gql`
  mutation Update_Current_User($user: User) {
    updateCurrentUser(user: $user) @client
  }
`;
