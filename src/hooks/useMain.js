import React, {useContext, useEffect, useState} from 'react';
import {NavigationContext} from 'react-navigation';
import {MainContext} from '../context/mainContent';
import {getToken, getUserId} from '../utils/localStore';

export const useMain = () => {
  const mainContext = useContext(MainContext);

  const navigation = useContext(NavigationContext);

  return {
    navigation,
    ...mainContext,
  };
};
