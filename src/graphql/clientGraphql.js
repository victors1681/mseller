import gql from 'graphql-tag';

export const GET_CLIENTS = gql`
  query CLIENTS($name: String) {
    clients(name: $name, limit: 10) {
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
      financial {
        balance
      }
    }
  }
`;

export const CLIENT_SELECTION = gql`
  mutation SELECT_CLIENT($client: client) {
    selectClient(client: $client) @client
  }
`;
