import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import ProductScreen from '../screens/products/ProductScreen';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ClientScreen from '../screens/clients/ClientScreen';

const config = Platform.select({
  web: {headerMode: 'screen'},
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config,
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="home" />,
};

HomeStack.path = '';

const ClientsStack = createStackNavigator(
  {
    Clients: ClientScreen,
  },
  config,
);

ClientsStack.navigationOptions = {
  title: 'Clients',
  tabBarLabel: 'Clients',
  tabBarIcon: ({focused}) => (
    <TabBarIcon focused={focused} name="account-group" />
  ),
};

ClientsStack.path = '';

const ProductsStack = createStackNavigator(
  {
    Products: ProductScreen,
  },
  config,
);

ProductsStack.navigationOptions = {
  title: 'Products',
  tabBarLabel: 'Products',
  tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="package" />,
};

ProductsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  ClientsStack,
  ProductsStack,
});

tabNavigator.path = '';

export default tabNavigator;
