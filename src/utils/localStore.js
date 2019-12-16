import AsyncStorage from '@react-native-community/async-storage';

export const setToken = async token => {
  if (!token) {
    console.log('invalid token');
    return;
  }

  try {
    await AsyncStorage.setItem('userToken', token);
    console.log('token saved');
  } catch (e) {
    console.error(e);
  }
};

export const getToken = async () => {
  try {
    const userToken = await AsyncStorage.getItem('userToken');

    return userToken;
  } catch (e) {
    console.error(e);
  }
  return null;
};
