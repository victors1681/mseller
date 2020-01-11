import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Currency from './Currency';

export const Title = styled.Text`
  margin-bottom: 4px;
  color: ${({theme}) => theme.colors.dark};
  font-size: ${({theme}) => theme.font.size.small};
  letter-spacing: 2px;
  justify-content: flex-start;
  font-weight: bold;
`;

export const AddIcon = styled(Icon).attrs(({theme}) => ({
  name: 'plus',
  size: 26,
  color: theme.colors.primary,
}))`
  margin-right: 10px;
`;

export const BackIcon = styled(Icon).attrs(({theme}) => ({
  name: 'chevron-left',
  size: 30,
  color: theme.colors.primary,
}))`
  margin-left: 10px;
`;

export const HeaderIcon = styled(Icon).attrs(({theme}) => ({
  size: 26,
  color: theme.colors.primary,
}))`
  margin-right: 10px;
`;

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.colors.lightGray};
`;
