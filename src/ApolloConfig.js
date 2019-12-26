import React, {useState, useEffect} from 'react';
import {AppRegistry, Text} from 'react-native';

import {ApolloProvider} from '@apollo/react-hooks';
import {getMainDefinition} from 'apollo-utilities';
import {ApolloClient} from 'apollo-client';
import {onError} from 'apollo-link-error';
import {withClientState} from 'apollo-link-state';
import {ApolloLink, Observable, split} from 'apollo-link';

import AsyncStorage from '@react-native-community/async-storage';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {persistCache} from 'apollo-cache-persist';
import {
  API_PRODUCTION_ENDPOINT,
  API_DEVELOPMENT_ENDPOINT,
} from 'react-native-dotenv';
import {WebSocketLink} from 'apollo-link-ws';
import {ReactNativeFile} from 'apollo-upload-client';
import {rootState} from './states/rootState';
import {useUserInfo} from './hooks/useUserInfo';
import {getToken, setToken} from './utils/localStore';

const {createUploadLink} = require('apollo-upload-client');

const ApolloConfig = ({children}) => {
  const [apolloClient, setClient] = useState(undefined);
  const {userInfo} = useUserInfo();

  console.log('userInfouserInfo', userInfo);

  useEffect(() => {
    const wsLink = new WebSocketLink({
      uri: __DEV__ ? API_DEVELOPMENT_ENDPOINT : API_PRODUCTION_ENDPOINT,
      options: {
        reconnect: true,
        reconnectionAttempts: 10,
        timeout: 3000,
        lazy: true,
        connectionParams: async observer => {
          return {
            headers: {
              'X-REQUEST-TYPE': 'WebSocket',
              authorization: `Bearer ${userInfo.token}` || '',
            },
          };
        },
      },
    });

    console.log('userInfo.tokenuserInfo.token', userInfo.token);
    const uploadLink = createUploadLink({
      uri: __DEV__ ? API_DEVELOPMENT_ENDPOINT : API_PRODUCTION_ENDPOINT, // Apollo Server is served from port 4000
      headers: {
        'X-REQUEST-TYPE': 'FILE-UPLOAD',
        authorization: `Bearer ${userInfo.token}` || '',
      },
    });

    // if (!apolloClient) {
    const cache = new InMemoryCache();

    const request = async operation => {
      operation.setContext({
        headers: {
          authorization: `Bearer ${userInfo.token}` || '',
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

    const isFile = value =>
      (typeof ReactNativeFile !== 'undefined' &&
        value instanceof ReactNativeFile) ||
      (typeof Blob !== 'undefined' && value instanceof Blob);

    const isUpload = ({variables}) => Object.values(variables).some(isFile);

    const isSubscriptionOperation = ({query}) => {
      const {kind, operation} = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    };

    const requestLink2 = split(isSubscriptionOperation, requestLink, wsLink);

    const terminalLink = split(isUpload, uploadLink, requestLink2);

    const client = new ApolloClient({
      link: terminalLink,
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
    // }
    return () => {};
  }, [userInfo, userInfo.token]);

  if (apolloClient === undefined) return <Text>Loading...</Text>;
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

AppRegistry.registerComponent('MSeller', () => ApolloConfig);
export default ApolloConfig;
