import React, {useState, useEffect} from 'react';
import head from 'lodash/head';
import {getToken, getUserId, setToken} from '../utils/localStore';

export const UserContext = React.createContext();

export const UserProvider = ({children}) => {
  const [userToken, setUserToken] = useState();
  const [userId, setUserId] = useState(null);

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

  useEffect(() => {
    setUserId(userInfo._id);
  }, [userInfo, userInfo._id]);

  const getInitials = () =>
    `${userInfo && head(userInfo.firstName)}${userInfo &&
      head(userInfo.lastName)}`;
  const getFullUserName = () => `${userInfo.firstName} ${userInfo.lastName}`;

  const updateUserInfo = data => data && setUserInfo(data);
  const getCompanyName = () =>
    (userInfo.business && userInfo.business.name) || '';

  const initialValues = {
    userInfo,
    updateUserInfo,
    userToken,
    userId,
    getInitials,
    getFullUserName,
    getCompanyName,
  };

  return (
    <UserContext.Provider value={initialValues}>
      {children}
    </UserContext.Provider>
  );
};
