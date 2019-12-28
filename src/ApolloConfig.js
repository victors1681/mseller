import React, {useState, useEffect} from 'react';
import {AppRegistry, Text, View} from 'react-native';
import {ApolloProvider} from '@apollo/react-hooks';
import {getMainDefinition} from 'apollo-utilities';
import {ApolloClient} from 'apollo-client';
import {onError} from 'apollo-link-error';
import {withClientState} from 'apollo-link-state';
import {ApolloLink, Observable, split} from 'apollo-link';
import {createHttpLink} from 'apollo-link-http';
import AsyncStorage from '@react-native-community/async-storage';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {persistCache, CachePersistor} from 'apollo-cache-persist';
import {
  API_PRODUCTION_ENDPOINT,
  API_DEVELOPMENT_ENDPOINT,
} from 'react-native-dotenv';
import {WebSocketLink} from 'apollo-link-ws';
import {ReactNativeFile, createUploadLink} from 'apollo-upload-client';
import {ErrorToast} from './components/Toast';
import {VERIFY_CACHE_EXIST_INITIAL_LAUNCH} from './graphql/documentGraphql';
import {rootState} from './states/rootState';
import {useUserInfo} from './hooks/useUserInfo';
import resolvers from './resolvers';
import {useMain} from './hooks';

const ApolloConfig = ({children}) => {
  const [apolloClient, setClient] = useState(undefined);
  const {userInfo} = useUserInfo();
  const [errors, setErrors] = useState(null);

  const {setPersistor, setApolloClient} = useMain();

  const handleUnMountErrors = () => setErrors(null);

  useEffect(() => {
    const createClient = async () => {
      const onErrorLink = onError(({graphQLErrors, networkError}) => {
        console.log('Chcking network!!');
        if (graphQLErrors) {
          setErrors({errorType: 'graphql', error: graphQLErrors});
          // graphQLErrors.map(({message, locations, path}) => {
          //   console.log(
          //     `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          //   );
          // });
        }
        if (networkError) {
          console.log(`[Network error]: ${networkError}`);
          setErrors({errorType: 'network', error: networkError});
        }
        // if (networkError) console.log(`[Network error]: ${networkError}`);
      });

      const httpLink = createHttpLink({
        uri: __DEV__ ? API_DEVELOPMENT_ENDPOINT : API_PRODUCTION_ENDPOINT,
        credentials: 'same-origin',
      });
      const middlewareLink = new ApolloLink((operation, forward) => {
        operation.setContext({
          headers: {
            'X-REQUEST-TYPE': 'HTTP',
            authorization: `Bearer ${userInfo.token}` || '',
          },
        });
        return forward(operation);
      });

      // use with apollo-client
      const httpLinkConcat = middlewareLink.concat(httpLink, onErrorLink);

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

      const uploadLink = createUploadLink({
        uri: __DEV__ ? API_DEVELOPMENT_ENDPOINT : API_PRODUCTION_ENDPOINT, // Apollo Server is served from port 4000
        headers: {
          'X-REQUEST-TYPE': 'FILE-UPLOAD',
          authorization: `Bearer ${userInfo.token}` || '',
        },
      });

      const cache = new InMemoryCache();

      const isFile = value => {
        return (
          (typeof ReactNativeFile !== 'undefined' &&
            value instanceof ReactNativeFile) ||
          (typeof Blob !== 'undefined' && value instanceof Blob)
        );
      };

      const isUpload = ({variables}) => Object.values(variables).some(isFile);

      const isSubscriptionOperation = ({query}) => {
        const {kind, operation} = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
      };

      const requestLink2 = split(
        isSubscriptionOperation,
        wsLink,
        httpLinkConcat,
      );

      const terminalLink = split(isUpload, uploadLink, requestLink2);

      const client = new ApolloClient({
        link: ApolloLink.from([onErrorLink, terminalLink]),
        resolvers: {
          Mutation: {
            ...resolvers.Mutation,
          },
        },
        cache,
      });

      const persistor = new CachePersistor({
        cache,
        storage: AsyncStorage,
        trigger: 'background',
      });
      console.log('persistor', persistor);
      await persistor.restore();
      setPersistor(persistor);

      const initData = {
        ...rootState(),
      };

      try {
        cache.readQuery({
          query: VERIFY_CACHE_EXIST_INITIAL_LAUNCH,
        });
      } catch (error) {
        console.log('INIT CACHE>>>>');

        client.writeData({
          data: initData,
        });
      }
      setClient(client);
      setApolloClient(client);

      // See above for additional options, including other storage providers.
      // persistCache({
      //   cache,
      //   storage: AsyncStorage,
      //   trigger: 'background',
      // }).then(() => {
      //   const initData = {
      //     ...rootState(),
      //   };

      //   try {
      //     cache.readQuery({
      //       query: VERIFY_CACHE_EXIST_INITIAL_LAUNCH,
      //     });
      //   } catch (error) {
      //     console.log('INIT CACHE>>>>');

      //     client.writeData({
      //       data: initData,
      //     });
      //   }

      //   client.onResetStore(async () => {
      //     console.log('Resetting Storage>>>>');
      //     cache.writeData({data: initData});
      //   });

      //   setClient(client);
      // });
    };
    createClient();
    return () => {};
  }, [userInfo, userInfo.token]);

  if (apolloClient === undefined) return <Text>Loading...</Text>;
  return (
    <ApolloProvider client={apolloClient}>
      {errors && (
        <ErrorToast errors={errors} handleUnMountErrors={handleUnMountErrors} />
      )}
      {children}
    </ApolloProvider>
  );
};

AppRegistry.registerComponent('MSeller', () => ApolloConfig);
export default ApolloConfig;
