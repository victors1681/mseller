import React, {useContext} from 'react';
import {useApolloClient} from '@apollo/react-hooks';
import {NavigationContext} from 'react-navigation';
import styled from 'styled-components/native';
import {Button} from 'react-native-elements';
import {useMain} from '../../hooks';

const LogOutButton = () => {
  const client = useApolloClient();
  const {persistor} = useMain();
  const navigation = useContext(NavigationContext);

  const handleLogOut = async () => {
    await client.clearStore();
    await persistor.purge();
    navigation.navigate('Auth');
  };

  return <Button title="LogOut" onPress={handleLogOut} />;
};

export default LogOutButton;
