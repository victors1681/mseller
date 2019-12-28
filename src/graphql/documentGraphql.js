import gql from 'graphql-tag';

export const VERIFY_CACHE_EXIST_INITIAL_LAUNCH = gql`
  query initial_local_verification_data {
    document {
      documentId
    }
  }
`;

export const GET_DOCUMENT_SEQUENCE = gql`
  query getNextDocSequence($sellerCode: String!, $documentType: String!) {
    docSequence(sellerCode: $sellerCode, documentType: $documentType) {
      nextDocNumber
      documentType
      prefix
      documentType
      sequenceGenerated
      description
    }
  }
`;

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
      total
      totalTax
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
