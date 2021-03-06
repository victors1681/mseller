export const documentLocalState = {
  __typename: 'documentCreation',
  documentId: '',
  date: '',
  dueDate: '',
  observations: '',
  annotation: '',
  termsConditions: '30%',
  documentType: 'order',
  client: null,
  retentions: [],
  currency: {
    __typename: 'currency',
    id: '002',
    code: 'USD',
    symbol: '$',
    exchangeRate: 54.5,
  },
  seller: {
    __typename: 'Seller',
    id: '24',
    name: 'Keysy',
    status: true,
    identification: '002323',
    observation: 'testing',
  },
  priceList: {
    __typename: 'priceList',
    id: '001',
    name: 'Distribuidor',
    status: true,
    type: 'percentage',
    percentage: 20.0,
  },
  total: 0.0,
  totalPaid: 0.0,
  totalTax: 0.0,
  balance: 0.0,
  NCF: '3903949493',
  orderNumber: '12312',
  items: [],
};

export default documentLocalState;
