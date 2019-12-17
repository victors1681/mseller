import {createBrowserApp} from '@react-navigation/web';
import {createStackNavigator} from 'react-navigation-stack';
import {createSwitchNavigator} from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';
import SignInScreen from '../screens/SignInScreen';
// import AuthLoadingScreen from '../screens/AuthLoadingScreen';

// const AppStack = createStackNavigator({ Home: MainTabNavigator });
const AuthStack = createStackNavigator({SignInScreen});

const switchNavigator = createSwitchNavigator(
  {
    // AuthLoading: AuthLoadingScreen,
    App: MainTabNavigator,
    Auth: AuthStack,
  },
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  {
    initialRouteName: 'AuthLoading',
  },
);
switchNavigator.path = '';

export default createBrowserApp(switchNavigator, {history: 'hash'});
