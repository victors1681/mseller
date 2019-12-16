import {createAppContainer, createSwitchNavigator} from 'react-navigation';
// import {createStackNavigator} from 'react-navigation-stack';
import MainTabNavigator from './MainTabNavigator';
import SignInScreen from '../screens/SignInScreen';
import ClientScreen from '../screens/clients/ClientScreen';

// const AppStack = createStackNavigator({ Home: MainTabNavigator });
// const AuthStack = createStackNavigator({SignIn: SignInScreen});
export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: SignInScreen,
      App: ClientScreen, // MainTabNavigator,
      Auth: SignInScreen,
    },
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);
