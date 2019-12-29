import React, {useContext} from 'react';
import {useApolloClient} from '@apollo/react-hooks';
import {NavigationContext} from 'react-navigation';
import styled from 'styled-components/native';
import {Button} from 'react-native-elements';
import {useMain} from '../../hooks';
import {resetToken} from '../../utils/localStore';
import {rootState} from '../../states/rootState';

const LogOutButton = () => {
  const client = useApolloClient();
  const {persistor, setAccessToken} = useMain();
  const navigation = useContext(NavigationContext);

  const handleLogOut = async () => {
    const initData = {
      ...rootState(),
    };
    client.writeData({
      data: initData,
    });
    await client.clearStore();
    await persistor.purge();
    await resetToken();
    setAccessToken(null);
    navigation.navigate('Auth');
  };

  return <Button title="LogOut" onPress={handleLogOut} />;
};

export default LogOutButton;
