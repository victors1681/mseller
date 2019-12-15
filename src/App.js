import React, {useState} from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import {ThemeProvider, ThemeConsumer} from 'react-native-elements';
import {ThemeProvider as ThemeProviderStyledComponent} from 'styled-components';
import customTheme from './theme';
import ApolloConfig from './ApolloConfig';

import AppNavigator from './navigation/AppNavigator';

const App = props => {
  return (
    <ThemeProvider theme={customTheme}>
      <ThemeConsumer>
        {({theme}) => (
          <ThemeProviderStyledComponent theme={theme}>
            <ApolloConfig>
              <View style={{flex: 1}}>
                {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                <AppNavigator />
              </View>
            </ApolloConfig>
          </ThemeProviderStyledComponent>
        )}
      </ThemeConsumer>
    </ThemeProvider>
  );
};

export default App;
