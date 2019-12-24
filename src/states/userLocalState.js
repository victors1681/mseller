export const userLocalState = {
  __typename: 'currentUser',
  token: null,
  _id: null,
  firstName: null,
  lastName: null,
  email: null,
  avatar: null,
  phone: null,
  sellerCode: null,
  mode: null,
  business: {
    __typename: 'currentBusiness',
    name: null,
    lang: 'en',
    dbName: null,
    phone: null,
    address: null,
    country: null,
  },
};

export default userLocalState;
