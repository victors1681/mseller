import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ListItem as ListItemNative} from 'react-native-elements';
import {AddIcon} from '../../common/common.styled';

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

export {AddIcon};
