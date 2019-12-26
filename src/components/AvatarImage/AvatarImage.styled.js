import styled from 'styled-components/native';
import {Button, Avatar} from 'react-native-elements';

export const ProfileAvatar = styled(Avatar).attrs(({theme}) => ({
  rounded: true,
  size: 'large',
  showEditButton: true,
}))`
  height: 80px;
  width: 80px;
`;
