import gql from 'graphql-tag';

export const VERIFY_CACHE_EXIST_INITIAL_LAUNCH = gql`
  query initial_local_verification_data {
    document {
      documentId
    }
  }
`;

export const DocSequenceFragment = gql`
  fragment DocSequenceInfo on DocSequence {
    nextDocNumber
    documentType
    prefix
    sequenceGenerated
    description
  }
`;

export const GET_DOCUMENT_SEQUENCE = gql`
  query getNextDocSequence($sellerCode: String!, $documentType: String!) {
    docSequence(sellerCode: $sellerCode, documentType: $documentType) {
      ...DocSequenceInfo
    }
  }
  ${DocSequenceFragment}
`;

export const ADD_DOCUMENT = gql`
  mutation addDocument($document: DocumentInput) {
    addDocument(document: $document)
  }
`;

export const UPDATE_DOCUMENT_INFO = gql`
  mutation updateDocumentInfo($documentInfo: DocumentInput) {
    updateDocumentInfo(documentInfo: $documentInfo) @client
  }
`;
export const RESET_CURRENT_DOCUMENT = gql`
  mutation resetCurrentDocument {
    resetCurrentDocument @client
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
      currency {
        id
        code
        symbol
        exchangeRate
      }
      seller {
        id
        name
        status
        identification
        observation
      }
      priceList {
        id
        name
        status
        type
        percentage
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
