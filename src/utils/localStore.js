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

export const setUserId = async userId => {
  if (!userId) {
    console.log('invalid userId');
    return;
  }

  try {
    await AsyncStorage.setItem('userId', userId);
    console.log('userId saved');
  } catch (e) {
    console.error(e);
  }
};

export const getUserId = async () => {
  try {
    const userId = await AsyncStorage.getItem('userId');

    return userId;
  } catch (e) {
    console.error(e);
  }
  return null;
};

export const setCurrency = async token => {
  if (!token) {
    console.log('invalid currency');
    return;
  }

  try {
    await AsyncStorage.setItem('currency', token);
    console.log('currency saved');
  } catch (e) {
    console.error(e);
  }
};

export const getCurrency = async () => {
  try {
    const currency = await AsyncStorage.getItem('currency');

    return currency;
  } catch (e) {
    console.error(e);
  }
  return null;
};
