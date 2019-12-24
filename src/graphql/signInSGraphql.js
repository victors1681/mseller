import gql from 'graphql-tag';
import {UserInfoFragments} from './userGraphql';

export const PERFORM_LOGIN = gql`
  mutation LOGIN($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ...UserInfo
    }
  }
  ${UserInfoFragments.userInfo}
`;
