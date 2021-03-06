import gql from 'graphql-tag';

export const GET_PRODUCTS = gql`
  query PRODUCTS($description: String) {
    products(description: $description, limit: 10) {
      code
      name
      description
      status
      price {
        name
        price
        type
        value
      }
      tax {
        id
        name
        percentage
        deductible
        description
        status
      }
      category {
        name
        description
      }
      inventory {
        unit {
          shortName
        }
        unit {
          name
        }
        initialQuantity
      }
    }
    document @client {
      items {
        code
        quantity
      }
    }
  }
`;

export const ADD_ITEM = gql`
  mutation Add_Item($item: String) {
    addItem(item: $item) @client
  }
`;
export const REMOVE_ITEM = gql`
  mutation Remove_Item($itemId: String) {
    removeItem(itemId: $itemId) @client
  }
`;
