import styled from 'styled-components/native';
import {ListItem as ListItemNative} from 'react-native-elements';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.colors.lightGray};
`;

export const Card = styled.View`
  padding: 10px;
  display: flex;
  flex-direction: row;
  background: ${({theme}) => theme.colors.white};
`;

export const ClientName = styled.Text`
  font-size: ${({theme}) => theme.font.size.large};
  color: ${({theme}) => theme.colors.dark};
`;

const subTitleStyle = theme => ({
  fontSize: theme.font.verySmall,
  color: theme.colors.grey3,
});

export const ListItem = styled(ListItemNative).attrs(({theme}) => ({
  subtitleStyle: subTitleStyle(theme),
}))``;
