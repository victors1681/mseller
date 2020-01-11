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
  padding-bottom: 8px;
  color: ${({theme}) => theme.colors.dark};
  text-transform: capitalize;
`;

const subTitleStyle = theme => ({
  fontSize: theme.font.verySmall,
  color: theme.colors.grey3,
});

export const ListItem = styled(ListItemNative).attrs(({theme}) => ({
  subtitleStyle: subTitleStyle(theme),
}))``;