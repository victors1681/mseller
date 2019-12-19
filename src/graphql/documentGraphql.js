import gql from 'graphql-tag';

export const GET_CURRENT_DOCUMENT = gql`
  query localDocument {
    document @client {
      documentId
      date
      dueDate
      observations
      annotation
      termsConditions
      documentType
      client {
        code
        name
        identification
        email
        phonePrimary
      }
      items {
        code
        name
        price
        quantity
        description
        tax {
          id
          name
          percentage
          deductible
          description
          status
        }
      }
    }
  }
`;
