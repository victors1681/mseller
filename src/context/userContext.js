import React, {useState, useEffect} from 'react';
import head from 'lodash/head';

export const UserContext = React.createContext();

export const UserProvider = ({children}) => {
  const [userToken] = useState();
  const [userId, setUserId] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (userInfo) {
      setUserId(userInfo._id);
    }
  }, [userInfo && userInfo._id]);

  const getInitials = () =>
    `${userInfo && head(userInfo.firstName)}${userInfo &&
      head(userInfo.lastName)}`;
  const getFullUserName = () => `${userInfo.firstName} ${userInfo.lastName}`;

  const updateUserInfo = data => {
    // update context
    setUserInfo(data);
  };

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
