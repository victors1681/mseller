import gql from 'graphql-tag';

export const ClientBasicInfoFragments = gql`
  fragment ClientBasicInfo on Client {
    name
    code
    identification
    email
    phonePrimary
    address {
      address
      city
      state
      country
    }
    status
    financial {
      balance
      creditLimit
    }
  }
`;

export const GET_CLIENTS = gql`
  query CLIENTS($name: String) {
    clients(name: $name, limit: 10) {
      ...ClientBasicInfo
    }
  }

  ${ClientBasicInfoFragments}
`;

export const GET_CLIENT = gql`
  query CLIENT($code: String) {
    client(code: $code) {
      phoneSecondary
      fax
      mobile
      observations
      type
      seller {
        id
        name
        identification
        email
      }
      internalContacts {
        id
        name
        phone
        mobile
        sendNotification
        identification
        status
      }
      geoLocation {
        location {
          type
          coordinates
        }
      }
      priceList {
        id
        name
        status
        type
        percentage
      }

      ...ClientBasicInfo
    }
  }

  ${ClientBasicInfoFragments}
`;

export const CLIENT_SELECTION = gql`
  mutation SELECT_CLIENT($client: client) {
    selectClient(client: $client) @client
  }
`;
