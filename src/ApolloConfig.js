import React from 'react';
import {AppRegistry} from 'react-native';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';

// import AsyncStorage from '@react-native-community/async-storage';
import {InMemoryCache} from 'apollo-cache-inmemory';
// import {persistCache} from 'apollo-cache-persist';
import {
  API_PRODUCTION_ENDPOINT,
  API_DEVELOPMENT_ENDPOINT,
} from 'react-native-dotenv';
import {rootState} from './states/rootState';

import {getToken, setToken} from './utils/localStore';

const cache = new InMemoryCache();

// const runPersiste = async () => {
//   await persistCache({
//     cache,
//     storage: AsyncStorage,
//     trigger: 'background',
//   });
// };

const onError = ({graphQLErrors, networkError, operation, forward}) => {
  if (graphQLErrors) {
    // sendToLoggingService(graphQLErrors);

    // graphQLErrors.map(({message, locations, path}) =>
    //   console.log(
    //     `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
    //   ),
    // );

    // eslint-disable-next-line no-restricted-syntax
    for (const err of graphQLErrors) {
      // handle errors differently based on its error code
      switch (err.extensions.code) {
        case 'UNAUTHENTICATED':
          // old token has expired throwing AuthenticationError,
          // one way to handle is to obtain a new token and
          // add it to the operation context

          // const headers = operation.getContext().headers
          // operation.setContext({
          //   headers: {
          //     ...headers,
          //     authorization: getNewToken(),
          //   },
          // });
          setToken(null);
          // Now, pass the modified operation to the next link
          // in the chain. This effectively intercepts the old
          // failed request, and retries it with a new token
          return forward(operation);
        default:
          break;
      }
    }
    if (networkError) {
      console.log('ISSUEEE NET');
    }
  }
  return forward(operation);
};

const request = async operation => {
  const token = await getToken();
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  });
};

const client = new ApolloClient({
  onError,
  request,
  cache,
  resolvers: {
    MyTest: (__root, _args, {cache}) => {
      console.log('REVOLVINGGGGGGGG', variables);
    },
    Mutation: {
      gatData: (_root, variables, {cache, getCacheKey}) => {
        console.log('REVOLVINGGGGGGGG', variables);
      },
    },
  },
  uri: __DEV__ ? API_DEVELOPMENT_ENDPOINT : API_PRODUCTION_ENDPOINT,
});

cache.writeData({
  data: {
    ...rootState(),
  },
});

const ApolloConfig = ({children}) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

AppRegistry.registerComponent('MSeller', () => ApolloConfig);
export default ApolloConfig;
