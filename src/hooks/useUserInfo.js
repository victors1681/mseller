import React, {useContext, useEffect, useState} from 'react';
import {NavigationContext} from 'react-navigation';
import {useLazyQuery} from '@apollo/react-hooks';
import {GET_USER_BY_ID} from '../graphql/userGraphql';
import {UserContext} from '../context/userContext';
import {getToken, getUserId} from '../utils/localStore';

export const useUserInfo = () => {
  const userContext = useContext(UserContext);
  const {updateUserInfo, userInfo, userId, userToken} = userContext;
  const navigation = useContext(NavigationContext);

  const [
    loadGreeting,
    {called, loading, data, error},
  ] = useLazyQuery(GET_USER_BY_ID, {variables: {id: userId}});

  //   useEffect(() => {
  //     updateUserInfo(data.user);
  //   }, [data && data.user._id]);

  //   useEffect(() => {
  //     console.log('EROR, AUTENTICATION> should be handle in other place');
  //   }, [error]);

  //   if (!userInfo.token) {
  //     // no token available..
  //     // find token on localdata

  //     if (userToken) {
  //       // get user information request to the server
  //       loadGreeting();
  //     } else {
  //       // token not exist redirect to login
  //       navigation.navigate('Auth');
  //     }
  //   }

  return {
    ...userContext,
    loading,
  };
};
