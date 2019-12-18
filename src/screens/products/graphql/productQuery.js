import gql from 'graphql-tag';

export const GET_PRODUCTS = gql`
  query PRODUCTS($description: String) {
    products(description: $description, limit: 10) {
      code
      name
      description
      price {
        name
        price
      }
    }
  }
`;
