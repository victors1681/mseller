import React, {useState, useEffect} from 'react';
import CurrencyContext from './CurrencyContext';
import {getCurrency} from '../../utils/localStore';

const CurrencyProvider = ({children}) => {
  const [data, setData] = useState({
    currency: 'USD',
    style: 'currency',
  });

  useEffect(async () => {
    const currency = (await getCurrency()) || 'USD';
    setData({...data, currency});
  }, []);

  return (
    <CurrencyContext.Provider name="Currency Provider" value={data}>
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyProvider;
