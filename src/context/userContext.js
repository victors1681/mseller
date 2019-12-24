import React, {useState, useEffect} from 'react';
import {getToken, getUserId, setToken} from '../utils/localStore';

export const UserContext = React.createContext();

export const UserProvider = ({children}) => {
  const [userToken, setUserToken] = useState();
  const [userId, setUserId] = useState();

  useEffect(() => {
    const getUserData = async () => {
      const userIdentification = await getUserId();
      const token = await getToken();

      setUserToken(token);
      setUserId(userIdentification);
    };
    getUserData();
  }, []);

  const [userInfo, setUserInfo] = useState({
    token: null,
    _id: null,
    firstName: null,
    lastName: null,
    email: null,
    avatar: null,
    phone: null,
    sellerCode: null,
    mode: null,
    business: {
      name: null,
      lang: 'en',
      dbName: null,
      phone: null,
      address: null,
      country: null,
    },
  });

  const updateUserInfo = data => data && setUserInfo(data);

  const initialValues = {
    userInfo,
    updateUserInfo,
    userToken,
    userId,
  };

  return (
    <UserContext.Provider value={initialValues}>
      {children}
    </UserContext.Provider>
  );
};
