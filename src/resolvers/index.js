import document from './document';
import user from './user';

export default {
  Mutation: {
    ...document.Mutation,
    ...user.Mutation,
  },
};
