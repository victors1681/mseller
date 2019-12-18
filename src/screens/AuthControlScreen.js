import React, {useEffect} from 'react';
import {Text} from 'react-native';
import {getToken} from '../utils/localStore';

const checkAuth = async navigation => {
  const userToken = await getToken();
  console.log('userTokenuserTokenuserTokenuserToken', userToken, navigation);
  navigation.navigate(userToken ? 'App' : 'Auth');
};
const AuthControl = ({navigation}) => {
  useEffect(() => {
    checkAuth(navigation);
  }, [navigation]);

  return <Text>Authenticating...</Text>;
};

export default AuthControl;
