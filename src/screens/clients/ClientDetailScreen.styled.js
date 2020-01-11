import styled from 'styled-components/native';
import {ListItem as ListItemNative} from 'react-native-elements';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.colors.lightGray};
`;

export const Card = styled.View`
  padding: 10px;
  display: flex;
  flex-direction: column;
  background: ${({theme}) => theme.colors.white};
`;

export const ClientName = styled.Text`
  font-size: ${({theme}) => theme.font.size.large};
  padding-bottom: 5px;
  color: ${({theme}) => theme.colors.dark};
  text-transform: capitalize;
`;

export const ClientSuspendedLabel = styled.Text`
  font-size: ${({theme}) => theme.font.size.large};
  padding: 5px;
  color: ${({theme}) => theme.colors.white};
  background-color: ${({theme}) => theme.colors.error};
  text-align: center;
  margin: -10px -10px 5px -10px;
`;

export const ContactList = styled(ListItemNative).attrs(({theme}) => ({
  rightTitleStyle: {
    fontSize: theme.font.size.regular,
  },
  rightSubtitleStyle: {
    fontSize: theme.font.size.regular,
  },
}))``;

const subTitleStyle = theme => ({
  fontSize: theme.font.verySmall,
  color: theme.colors.grey3,
});

export const FinanceWrapper = styled.View`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
`;
export const ListItem = styled(ListItemNative).attrs(({theme}) => ({
  subtitleStyle: subTitleStyle(theme),
}))``;
