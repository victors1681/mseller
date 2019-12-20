import {GET_CURRENT_DOCUMENT} from '../../graphql/documentGraphql';

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
    addItem: (_root, {item}, {cache, getCacheKey}) => {
      const id = getCacheKey({__typename: 'documentCreation'});

      const {document} = cache.readQuery({
        query: GET_CURRENT_DOCUMENT,
      });

      const {total, totalTax} = updateTotals([...document.items, item]);
      const doc = {
        ...document,
        items: [...document.items, item],
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
    removeItem: (_root, {itemId}, {cache, getCacheKey}) => {
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
    selectClient: (
      _root,
      {client: {code, identification, name, email, phonePrimary}},
      {cache, getCacheKey},
    ) => {
      const {document} = cache.readQuery({
        query: GET_CURRENT_DOCUMENT,
      });

      console.log(
        'clientclient',
        code,
        identification,
        name,
        email,
        phonePrimary,
      );

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
  },
};

export default documentResolvers;
