import React, {useEffect} from 'react';
import {Text, ActivityIndicator} from 'react-native';
import {useLazyQuery} from '@apollo/react-hooks';
import {getToken} from '../utils/localStore';
import {useMain} from '../hooks/useMain';
import {GET_CURRENT_USER} from '../graphql/userGraphql';
import Loading from '../components/Loading';
import {useUserInfo} from '../hooks';

const AuthControl = ({navigation}) => {
  const {accessToken, setAccessToken} = useMain();
  const {updateUserInfo} = useUserInfo();
  const [getCurrentUser, {data}] = useLazyQuery(GET_CURRENT_USER);
  const checkAuth = async () => {
    const userToken = await getToken();

    if (userToken && !accessToken) {
      // Update user info and redirect to home;
      setAccessToken(userToken);
      getCurrentUser();
      return;
    }

    navigation.navigate(userToken && accessToken ? 'App' : 'Auth');
  };

  useEffect(() => {
    if (data && data.currentUser) {
      updateUserInfo(data.currentUser);
      navigation.navigate(data.currentUser.token ? 'App' : 'Auth');
    }
  }, [data && data.currentUser]);

  // Initialize user data and update token to avoid login again and keep the session alive
  useEffect(() => {
    checkAuth(navigation);
  }, [navigation]);

  return (
    <Loading>
      <Text>Loading...</Text>
    </Loading>
  );
};

export default AuthControl;
