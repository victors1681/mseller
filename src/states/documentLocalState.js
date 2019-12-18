export const documentLocalState = {
  __typename: 0,
  documentId: 'A-23',
  date: '2019-11-12',
  dueDate: '2020-11-01',
  observations: 'test',
  annotation: 'test annotation',
  termsConditions: '30%',
  documentType: 'order',
  client: {
    code: '001',
    identification: '0011765',
    name: 'Victor',
    email: 'victors1681@gmail.com',
    phonePrimary: '929-286-112',
  },
  retentions: [
    {
      __typename: 3,
      id: 'sss',
      name: 'Sobre la renta',
      percentage: 20.0,
      description: 'testing retention',
      type: 'Fuente',
    },
  ],
  currency: {
    id: '002',
    code: 'USD',
    symbol: '$',
    exchangeRate: 54.5,
  },
  seller: {
    code: '0023',
    name: 'Keysy',
    status: true,
    identification: '002323',
    observations: 'testing',
  },
  priceList: {
    id: '001',
    name: 'Distribuidor',
    status: true,
    type: 'percentage',
    percentage: 20.0,
  },
  total: 300.0,
  totalPaid: 0.0,
  balance: 300.0,
  NCF: '3903949493',
  orderNumber: '12312',
  items: [
    {
      __typename: 0,
      code: 'AM3-343',
      name: 'Product-test',
      description: 'Testing product',
      price: 2332.9,
      quantity: 3,
      tax: [
        {
          __typename: 0,
          id: '001',
          name: 'ITBIS',
          percentage: 18.0,
          description: 'Retenction',
        },
      ],
    },
  ],
};

export default documentLocalState;
