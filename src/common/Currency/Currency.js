import React, {useContext} from 'react';
import {useIntl} from 'react-intl';
import styled from 'styled-components/native';
import Context from './CurrencyContext';

const Text = styled.Text`
  color: ${({theme, color}) => theme.colors[color] || theme.colors.dark};
  font-size: ${({theme, size}) =>
    theme.font.size[size] || theme.font.size.small};
`;

const Currency = ({value, ...res}) => {
  const {currency, style} = useContext(Context);
  const intl = useIntl();

  return <Text {...res}>{intl.formatNumber(value, {style, currency})}</Text>;
};

export default Currency;
