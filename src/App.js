import React from 'react';
import {Platform, StatusBar} from 'react-native';
import {ThemeProvider, ThemeConsumer} from 'react-native-elements';
import {ThemeProvider as ThemeProviderStyledComponent} from 'styled-components';
import styled from 'styled-components/native';
import customTheme from './theme';
import ApolloConfig from './ApolloConfig';

import AppNavigator from './navigation/AppNavigator';

const AppContainer = styled.View`
  flex: 1;
`;
const App = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <ThemeConsumer>
        {({theme}) => (
          <ThemeProviderStyledComponent theme={theme}>
            <ApolloConfig>
              <AppContainer>
                {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                <AppNavigator />
              </AppContainer>
            </ApolloConfig>
          </ThemeProviderStyledComponent>
        )}
      </ThemeConsumer>
    </ThemeProvider>
  );
};

export default App;
