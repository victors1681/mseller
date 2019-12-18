import styled from 'styled-components/native';
import {ListItem as ListItemNative} from 'react-native-elements';

export const Container = styled.View`
  flex: 1;
`;

const subTitleStyle = theme => ({
  fontSize: theme.font.verySmall,
  color: theme.colors.grey3,
});

export const ListItem = styled(ListItemNative).attrs(({theme}) => ({
  subtitleStyle: subTitleStyle(theme),
}))`
  background-color: ${({isSelected, theme}) => (isSelected ? 'red' : 'white')};
`;
