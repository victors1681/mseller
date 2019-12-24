import React, {useState, useEffect} from 'react';
import {AppRegistry, Text} from 'react-native';

import {ApolloProvider} from '@apollo/react-hooks';

import {ApolloClient} from 'apollo-client';
import {onError} from 'apollo-link-error';
import {withClientState} from 'apollo-link-state';
import {ApolloLink, Observable} from 'apollo-link';

import AsyncStorage from '@react-native-community/async-storage';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {persistCache} from 'apollo-cache-persist';
import {
  API_PRODUCTION_ENDPOINT,
  API_DEVELOPMENT_ENDPOINT,
} from 'react-native-dotenv';
import {WebSocketLink} from 'apollo-link-ws';
import {rootState} from './states/rootState';

import {getToken, setToken} from './utils/localStore';

const wsLink = new WebSocketLink({
  uri: __DEV__ ? API_DEVELOPMENT_ENDPOINT : API_PRODUCTION_ENDPOINT,
  options: {
    reconnect: true,
    reconnectionAttempts: 10,
    timeout: 3000,
    lazy: true,
    connectionParams: async () => {
      const token = await getToken();
      return {
        headers: {
          authorization: token ? `Bearer ${token}` : '',
        },
      };
    },
  },
});

const ApolloConfig = ({children}) => {
  const [apolloClient, setClient] = useState(undefined);
  useEffect(() => {
    const cache = new InMemoryCache();

    const request = async operation => {
      const token = await getToken();
      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : '',
        },
      });
    };

    const requestLink = new ApolloLink(
      (operation, forward) =>
        new Observable(observer => {
          let handle;
          Promise.resolve(operation)
            .then(oper => request(oper))
            .then(() => {
              handle = forward(operation).subscribe({
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer),
              });
            })
            .catch(observer.error.bind(observer));

          return () => {
            if (handle) handle.unsubscribe();
          };
        }),
    );

    const client = new ApolloClient({
      link: ApolloLink.from([
        onError(({graphQLErrors, networkError}) => {
          if (graphQLErrors) {
            console.log('ERRORRRRRR', graphQLErrors);
          }
          if (networkError) {
            // logoutUser();
            console.log('Logout User');
          }
        }),
        requestLink,
        withClientState({
          defaults: {
            isConnected: true,
          },
          resolvers: {
            Mutation: {
              updateNetworkStatus: (_, {isConnected}, {cache}) => {
                cache.writeData({data: {isConnected}});
                return null;
              },
            },
          },
          cache,
        }),
        wsLink,
      ]),
      cache,
    });

    // See above for additional options, including other storage providers.
    persistCache({
      cache,
      storage: AsyncStorage,
      trigger: 'background',
    }).then(() => {
      const initData = {
        ...rootState(),
      };
      client.writeData({
        data: initData,
      });
      client.onResetStore(async data => {
        console.log('RESTORINGG>>>>', data);
        cache.writeData({data: initData});
      });

      setClient(client);
    });
    return () => {};
  }, []);

  if (apolloClient === undefined) return <Text>Loading...</Text>;
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

AppRegistry.registerComponent('MSeller', () => ApolloConfig);
export default ApolloConfig;
