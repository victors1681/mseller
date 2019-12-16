import styled from 'styled-components/native';
import {ListItem as ListItemNative} from 'react-native-elements';

const containerStyle = theme => ({
  backgroundColor: theme.colors.lightGray,
});
export const Container = styled.View.attrs(({theme}) => ({
  containerStyle: containerStyle(theme),
}))`
  flex: 1;
`;

const titleStyle = theme => ({
  fontSize: theme.font.small,
  color: theme.colors.dark,
});
const subTitleStyle = theme => ({
  fontSize: theme.font.verySmall,
  color: theme.colors.grey3,
});

export const ListItem = styled(ListItemNative).attrs(({theme}) => ({
  titleStyle: titleStyle(theme),
  subtitleStyle: subTitleStyle(theme),
}))``;
