import React from 'react';
import {Platform, Text} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import ProductScreen from '../screens/products/ProductScreen';
import ProductSelectorScreen from '../screens/products/ProductSelectorScreen';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ClientScreen from '../screens/clients/ClientScreen';
import DocumentsHomeScreen from '../screens/documents/DocumentsHomeScreen';
import DocumentEditScreen from '../screens/documents/DocumentEditScreen';

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

const DocumentsStack = createStackNavigator(
  {
    Documents: DocumentsHomeScreen,
    DocumentEdit: DocumentEditScreen,
    ProductSelector: ProductSelectorScreen,
    ClientSelector: ClientScreen,
  },
  config,
);

DocumentsStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    title: 'Documents',
    tabBarLabel: 'Documents',
    tabBarIcon: ({focused}) => (
      <TabBarIcon focused={focused} name="file-document" />
    ),
  };
};

DocumentsStack.path = '';

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
  DocumentsStack,
  ClientsStack,
  ProductsStack,
});

tabNavigator.path = '';

export default tabNavigator;
