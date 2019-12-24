import {GET_CURRENT_USER} from '../../graphql/userGraphql';

const userResolvers = {
  Mutation: {
    updateCurrentUser: (_root, {user}, {cache}) => {
      cache.writeData({
        data: {
          user,
        },
      });

      return user;
    },
  },
};

export default userResolvers;
