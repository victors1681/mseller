import React, {useContext, useEffect, useState} from 'react';
import {MainContext} from '../context/mainContent';

export const useMain = () => {
  const mainContext = useContext(MainContext);
  return {
    ...mainContext,
  };
};
