import styled from 'styled-components/native';
import {Button, Avatar} from 'react-native-elements';

export const MainContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

export const ListContainer = styled.ScrollView.attrs({
  alwaysBounceHorizontal: true,
  alwaysBounceVertical: false,
  horizontal: true,
})`
  height: 90px;
  flex-direction: row;
`;

export const UserAvatar = styled(Avatar).attrs(({theme}) => ({
  rounded: true,
  size: 'medium',
}))`
  height: 50px;
  width: 50px;
  margin: 10px;
  margin-bottom: 3px;
`;

export const AvatarWrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

export const UserName = styled.Text`
  margin-bottom: 4px;
  color: ${({theme}) => theme.colors.titleGray};
  font-size: ${({theme}) => theme.font.size.small};
`;

export const Title = styled.Text`
  margin-bottom: 4px;
  color: ${({theme}) => theme.colors.dark};
  font-size: ${({theme}) => theme.font.size.regular};

  font-weight: bold;
`;
