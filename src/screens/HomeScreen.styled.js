import {Button, Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import Currency from '../common/Currency';

export const ScrollView = styled.ScrollView`
  flex: 1;
  flex-direction: column;
`;

export const Header = styled.View`
  flex: 1;
  min-height: 150px;
  flex-direction: row;
`;
export const ProfileWrapper = styled.View`
  width: 50%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const ProfileAvatar = styled(Avatar).attrs(({theme}) => ({
  rounded: true,
  size: 'xlarge',
}))`
  height: 100px;
  width: 100px;
`;

export const FinanceBloc = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const SummaryWrapper = styled.View`
  width: 50%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;
export const SummaryTitle = styled.Text`
  margin-bottom: 4px;
  color: ${({theme}) => theme.colors.titleGray};
  font-size: ${({theme}) => theme.font.size.small};
  justify-content: flex-start;
  font-weight: bold;
`;

export const SummaryValue = styled(Currency)`
  color: ${({theme}) => theme.colors.primary};
  font-size: ${({theme}) => theme.font.size.large};
  justify-content: flex-start;
  margin-bottom: 15px;
  align-items: flex-start;
`;

export const ProfileName = styled.Text`
  margin-top: 10px;
  font-size: ${({theme}) => theme.font.size.regular};
  color: ${({theme}) => theme.colors.dark};
`;
export const CompanyName = styled.Text`
  font-size: ${({theme}) => theme.font.size.small};
  color: ${({theme}) => theme.colors.dark};
`;

export const SaleGraph = styled.View`
  flex: 1;
`;

export const PaymentGraph = styled.View`
  flex: 1;
`;

export const NotificationIcon = styled(Icon).attrs(({theme}) => ({
  name: 'bell',
  size: 18,
  containerStyle: {marginRight: 10},
  color: theme.colors.grey4,
}))``;
