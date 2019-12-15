import React, {useEffect} from 'react';
import {ActivityIndicator, AsyncStorage, StatusBar, View} from 'react-native';
import {getToken} from '../utils/localStore';

const checkAuth = async navigation => {
  //const userToken = getToken();
  // navigation.navigate(userToken ? 'App' : 'Auth');
  navigation.navigate('Auth');
};
const AuthLoadingScreen = ({navigation}) => {
  useEffect(() => {
    checkAuth(navigation);
  }, [navigation]);

  return (
    <View>
      <ActivityIndicator>
        <StatusBar barStyle="default" />
      </ActivityIndicator>
    </View>
  );
};

export default AuthLoadingScreen;
