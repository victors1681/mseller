import React from 'react';
import {AppRegistry} from 'react-native';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from '@apollo/react-hooks';
//import AsyncStorage from '@react-native-community/async-storage';
//import {InMemoryCache} from 'apollo-cache-inmemory';
//import {persistCache} from 'apollo-cache-persist';

import {
  API_PRODUCTION_ENDPOINT,
  API_DEVELOPMENT_ENDPOINT,
} from 'react-native-dotenv';

//const cache = new InMemoryCache();

// const waitOnCache = persistCache({
//   cache,
//   storage: AsyncStorage,
//   trigger: 'background',
// });

const client = new ApolloClient({
  uri: __DEV__ ? API_DEVELOPMENT_ENDPOINT : API_PRODUCTION_ENDPOINT,
});

const ApolloConfig = ({children}) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

AppRegistry.registerComponent('MSeller', () => ApolloConfig);
export default ApolloConfig;
