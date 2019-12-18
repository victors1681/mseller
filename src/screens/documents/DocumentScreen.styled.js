import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ListItem as ListItemNative} from 'react-native-elements';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

const subTitleStyle = theme => ({
  fontSize: theme.font.verySmall,
  color: theme.colors.grey3,
});

export const ListItem = styled(ListItemNative).attrs(({theme}) => ({
  subtitleStyle: subTitleStyle(theme),
}))``;

export const AddIcon = styled(Icon).attrs(({theme}) => ({
  name: 'plus',
  size: 26,
  color: theme.colors.primary,
}))`
  margin-right: 10px;
`;
