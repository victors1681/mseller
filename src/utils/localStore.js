import { AsyncStorage } from 'react-native';

export const setToken = async (token) => {
  if (!token) {
    console.log('invalid token');
    return;
  }
  const userInfo = {
    user: {
      token
    }
  };

  try {
    await AsyncStorage.setItem('userInfo', token);
    console.log('token saved');
  } catch (e) {
    console.error(e);
  }
};

export const getToken = async () => {
  try {
    const userInfo = await AsyncStorage.getItem('userInfo');
    return userInfo;
  } catch (e) {
    console.error(e);
  }
};
