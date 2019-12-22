import React from 'react';
import {Finance} from './FinanceButton.styled';

const FinanceButton = ({
  title,
  value,
  action,
  chevronOrientation = 'left',
  highlight = false,
}) => (
  <Finance.FinanceBtn onPress={action}>
    {chevronOrientation === 'left' && (
      <Finance.FinanceBtnChevron chevronOrientation="left" />
    )}
    <Finance.FinanceBtnContentWrapper>
      <Finance.FinanceBtnValue highlight={highlight} value={value} />
      <Finance.FinanceBtnTitle>{title}</Finance.FinanceBtnTitle>
    </Finance.FinanceBtnContentWrapper>
    {chevronOrientation === 'right' && (
      <Finance.FinanceBtnChevron chevronOrientation="right" />
    )}
  </Finance.FinanceBtn>
);

export default FinanceButton;
