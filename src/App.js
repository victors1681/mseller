import React, {useEffect} from 'react';
import {Platform, StatusBar} from 'react-native';
import {ThemeProvider, ThemeConsumer} from 'react-native-elements';
import {ThemeProvider as ThemeProviderStyledComponent} from 'styled-components';
import styled from 'styled-components/native';
import SplashScreen from 'react-native-splash-screen';

import 'intl';
// in order to make the intl works on android I had to add
// def jscFlavor = 'org.webkit:android-jsc-intl:+' in android app
import 'intl/locale-data/jsonp/en-US';
import 'intl/locale-data/jsonp/es-US';
import {IntlProvider} from 'react-intl';

import CurrencyProvider from './common/Currency/CurrencyProvider';
import translation from './common/i18n/translation';

import customTheme from './theme';
import ApolloConfig from './ApolloConfig';
import {UserProvider} from './context/userContext';
import {MainProvider} from './context/mainContent';
import AppNavigator from './navigation/AppNavigator';

// if (Platform.OS === 'android') {
//   required('intl/locale-data/jsonp/en-US');
//   required('intl/locale-data/jsonp/es-US');
// }

const AppContainer = styled.View`
  flex: 1;
`;

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <ThemeProvider theme={customTheme}>
      <ThemeConsumer>
        {({theme}) => (
          <ThemeProviderStyledComponent theme={theme}>
            <MainProvider>
              <ApolloConfig>
                <UserProvider>
                  <IntlProvider locale="en-US" messages={translation.es}>
                    <CurrencyProvider>
                      <AppContainer>
                        {Platform.OS === 'ios' && (
                          <StatusBar barStyle="dark-content" />
                        )}

                        <AppNavigator />
                      </AppContainer>
                    </CurrencyProvider>
                  </IntlProvider>
                </UserProvider>
              </ApolloConfig>
            </MainProvider>
          </ThemeProviderStyledComponent>
        )}
      </ThemeConsumer>
    </ThemeProvider>
  );
};

export default App;
