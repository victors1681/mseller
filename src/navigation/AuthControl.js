import {useEffect} from 'react';
import {getToken} from '../utils/localStore';

const checkAuth = async navigation => {
  const userToken = await getToken();
  navigation.navigate(userToken ? 'App' : 'Auth');
};
const AuthControl = ({children, navigation}) => {
  useEffect(() => {
    checkAuth(navigation);
  }, [navigation]);

  return children;
};

export default AuthControl;
