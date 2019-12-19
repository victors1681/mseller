import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native';
import {ListItem} from 'react-native-elements';
import Currency from '../../common/Currency';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.colors.lightGray};
`;

export const SaveIcon = styled(Icon).attrs(({theme}) => ({
  name: 'content-save',
  size: 26,
  color: theme.colors.primary,
}))`
  margin-right: 10px;
`;

export const ClientIcon = styled(Icon).attrs(({theme}) => ({
  name: 'account-tie',
  size: 30,
  color: theme.colors.grey2,
}))`
  margin-right: 10px;
`;

export const Footer = styled.View`
  flex-direction: column;
  background-color: ${({theme}) => theme.colors.dark};
  height: 110;
  margin-bottom: -40px;
  padding-top: 10px;
`;

export const FooterRow = styled.View`
  flex-direction: row;
  margin-bottom: 3px;
  margin-top: 3px;
  margin-left: 15px;
  margin-right: 15px;
`;

export const FooterTotalLabel = styled.Text`
  flex: 1;
  font-weight: bold;

  color: white;
  font-size: ${({theme}) => theme.font.size.large};
`;

export const FooterTotalValue = styled(Currency)`
  font-size: ${({theme}) => theme.font.size.large};
  font-weight: bold;
  color: white;
`;

export const FooterSubLabel = styled.Text`
  flex: 1;
  font-weight: bold;
  color: white;
  font-size: ${({theme}) => theme.font.size.regular};
`;

export const FooterSubValue = styled(Currency)`
  font-size: ${({theme}) => theme.font.size.regular};
  font-weight: bold;
  color: white;
`;

export const AddIcon = styled(Icon).attrs(({theme}) => ({
  name: 'plus-circle',
  size: 18,
  color: theme.colors.primary,
}))`
  margin-top: 2;
  margin-right: 3;
`;

export const DeleteIcon = styled(Icon).attrs(({theme}) => ({
  name: 'delete-outline',
  size: 20,
  color: theme.colors.white,
}))``;

export const ActionWrapper = styled.View`
  align-items: center;
  background-color: ${({theme}) => theme.colors.error};
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 15;
`;
export const TouchableItem = styled(TouchableOpacity)`
  right: 0;
  align-items: center;
  bottom: 0;
  justify-content: center;
  position: absolute;
  top: 0;
  width: 75;
`;

export const DocumentInfoItem = styled(ListItem).attrs(({theme}) => ({
  friction: 90,
  tension: 100,
  activeScale: 0.95,
  titleStyle: {color: theme.colors.grey2, fontSize: theme.font.size.medium},
  subtitleStyle: {color: theme.colors.grey3, fontSize: theme.font.size.regular},
  chevron: {color: theme.colors.primary},
}))``;

export const ClientInfoItem = styled(ListItem).attrs(({theme}) => ({
  friction: 90,
  tension: 100,
  activeScale: 0.95,
  titleStyle: {
    color: theme.colors.grey1,
    fontSize: theme.font.size.medium,
    fontWeight: 'bold',
  },
  subtitleStyle: {color: theme.colors.grey3, fontSize: theme.font.size.regular},
  chevron: {color: theme.colors.primary},
  containerStyle: {margin: 10},
}))``;
