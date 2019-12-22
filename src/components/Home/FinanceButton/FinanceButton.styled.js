import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';
import Currency from '../../../common/Currency';

export const FinanceBtn = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin: 20px;
`;

export const FinanceBtnChevron = styled(Icon).attrs(
  ({theme, chevronOrientation}) => ({
    name: chevronOrientation === 'left' ? 'chevron-left' : 'chevron-right',
    color: theme.colors.primary,
    size: 15,
  }),
)`
  flex-direction: row;
  margin: 8px;
`;

export const FinanceBtnContentWrapper = styled.View`
  margin-bottom: 4px;
  color: ${({theme}) => theme.colors.titleGray};
  font-size: ${({theme}) => theme.font.size.small};
  justify-content: flex-start;
  font-weight: bold;
`;

export const FinanceBtnTitle = styled.Text`
  margin-bottom: 4px;
  color: ${({theme}) => theme.colors.titleGray};
  font-size: ${({theme}) => theme.font.size.small};
  justify-content: flex-start;
  font-weight: bold;
`;

export const FinanceBtnValue = styled(Currency)`
  color: ${({theme, highlight}) =>
    highlight ? theme.colors.error : theme.colors.secondary};
  font-size: ${({theme}) => theme.font.size.large};
  justify-content: flex-start;
  margin-bottom: 2px;
  align-items: flex-start;
`;

export const Finance = {
  FinanceBtn,
  FinanceBtnChevron,
  FinanceBtnContentWrapper,
  FinanceBtnTitle,
  FinanceBtnValue,
};
