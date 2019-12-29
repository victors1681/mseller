import {GET_CURRENT_DOCUMENT} from '../../graphql/documentGraphql';
import {documentLocalState} from '../../states/documentLocalState';

const updateTotals = items => {
  let totalTax = 0;

  const total = items.reduce((acc, current) => {
    const currentTax = current.tax
      .map(tax => (tax.percentage / 100 + 1) * current.price - current.price)
      .reduce((a, c) => a + c);
    totalTax += currentTax * current.quantity;
    return acc + (current.price + currentTax) * current.quantity;
  }, 0);

  return {total, totalTax};
};

const documentResolvers = {
  Mutation: {
    addItem: async (_root, {item}, {cache, getCacheKey}) => {
      const id = getCacheKey({__typename: 'documentCreation'});

      const {document} = cache.readQuery({
        query: GET_CURRENT_DOCUMENT,
      });
      // if the item exist remove it and insert the new one
      const items = document.items.filter(i => i.code !== item.code);

      const {total, totalTax} = updateTotals([...items, item]);
      const doc = {
        ...document,
        items: [...items, item],
        total,
        totalTax,
      };
      console.log('ADDING NEW ITEM!!!!', doc, item);

      cache.writeData({
        data: {
          document: doc,
        },
      });

      return doc.items;
    },
    removeItem: async (_root, {itemId}, {cache, getCacheKey}) => {
      const {document} = cache.readQuery({
        query: GET_CURRENT_DOCUMENT,
      });

      console.log('removing', itemId);

      const items = document.items.filter(item => item.code !== itemId);

      const {total, totalTax} = updateTotals(items);

      cache.writeData({
        data: {
          document: {...document, items, total, totalTax},
        },
      });

      return document;
    },
    selectClient: async (
      _root,
      {client: {code, identification, name, email, phonePrimary}},
      {cache, getCacheKey},
    ) => {
      const {document} = cache.readQuery({
        query: GET_CURRENT_DOCUMENT,
      });

      console.log('document adding new client', document);

      cache.writeData({
        data: {
          document: {
            ...document,
            client: {
              code,
              identification,
              name,
              email,
              phonePrimary,
              __typename: 'client',
            },
          },
        },
      });

      return document;
    },
    /**
     * @param {documentInfo}  DocumentInput update only fields coming from documentType
     */
    updateDocumentInfo: async (_root, {documentInfo}, {cache}) => {
      const {document: localDocument} = cache.readQuery({
        query: GET_CURRENT_DOCUMENT,
      });

      const valuesToUpdate = Object.keys(documentInfo).reduce(
        (acc, currentKeyDoc) => {
          if (documentInfo[currentKeyDoc]) {
            return {...acc, [currentKeyDoc]: documentInfo[currentKeyDoc]};
          }
          return acc;
        },
        {},
      );

      const documentUpdated = {
        __typename: 'documentCreation',
        ...localDocument,
        ...valuesToUpdate,
      };

      cache.writeData({
        data: {
          document: documentUpdated,
        },
      });

      return documentUpdated;
    },
    resetCurrentDocument: async (_root, __, {cache}) => {
      await cache.writeData({
        data: {
          document: {...documentLocalState},
        },
      });
      const {document: localDocument} = await cache.readQuery({
        query: GET_CURRENT_DOCUMENT,
      });
      console.log(
        'documentLocalStatedocumentLocalState',
        localDocument,
        documentLocalState,
      );

      return null;
    },
  },
};

export default documentResolvers;
