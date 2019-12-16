import React, {useContext} from 'react';
import {useIntl} from 'react-intl';
import {Text} from 'react-native';
import Context from './CurrencyContext';

const Currency = ({value}) => {
  const {currency, style} = useContext(Context);
  const intl = useIntl();

  return (
    <Text style={{color: 'red'}}>
      {intl.formatNumber(value, {style, currency})}
    </Text>
  );
};

export default Currency;
