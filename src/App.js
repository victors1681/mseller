import React from 'react';
import {Platform, StatusBar} from 'react-native';
import {ThemeProvider, ThemeConsumer} from 'react-native-elements';
import {ThemeProvider as ThemeProviderStyledComponent} from 'styled-components';
import styled from 'styled-components/native';
import {IntlProvider} from 'react-intl';
import CurrencyProvider from './common/Currency/CurrencyProvider';
import translation from './common/i18n/translation';

import customTheme from './theme';
import ApolloConfig from './ApolloConfig';

import AppNavigator from './navigation/AppNavigator';
import AuthControl from './navigation/AuthControl';

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
              <IntlProvider locale="es-US" messages={translation.es}>
                <CurrencyProvider>
                  <AppContainer>
                    {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
                    <AuthControl>
                      <AppNavigator />
                    </AuthControl>
                  </AppContainer>
                </CurrencyProvider>
              </IntlProvider>
            </ApolloConfig>
          </ThemeProviderStyledComponent>
        )}
      </ThemeConsumer>
    </ThemeProvider>
  );
};

export default App;
