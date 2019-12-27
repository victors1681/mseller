import gql from 'graphql-tag';

export const UserBasicInfoFragments = {
  UserBasicInfo: gql`
    fragment UserBasicInfo on User {
      _id
      firstName
      lastName
      email
      avatar
      position
      phone
      sellerCode
      mode
      defaultColor
    }
  `,
};
export const UserInfoFragments = {
  userInfo: gql`
    fragment UserInfo on User {
      token
      _id
      firstName
      lastName
      email
      avatar
      position
      phone
      sellerCode
      mode
      defaultColor
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

export const GET_ALL_BUSINESS_USERS = gql`
  query users {
    users {
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

export const UPDATE_USER_AVATAR = gql`
  mutation UpdateUserAvatar($file: Upload!, $userId: ID) {
    uploadUserAvatar(file: $file, userId: $userId)
  }
`;
