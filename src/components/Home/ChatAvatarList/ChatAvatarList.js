import React, {useContext} from 'react';
import {NavigationContext} from 'react-navigation';

import {
  ListContainer,
  UserAvatar,
  MainContainer,
  Title,
  UserName,
  AvatarWrapper,
} from './ChatAvatarList.style';

const getAvatarList = navigation => {
  const list = [];
  for (let x = 0; x < 25; x++) {
    list.push(
      <AvatarWrapper>
        <UserAvatar
          source={{
            uri:
              'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          }}
          title="MT"
          onPress={() =>
            navigation.navigate('ChatRoom', {userInfo: {name: 'Victor'}})}
        />
        <UserName>Victor</UserName>
      </AvatarWrapper>,
    );
  }
  return list;
};
const ChatAvatarList = () => {
  const navigation = useContext(NavigationContext);
  return (
    <MainContainer>
      <ListContainer>{getAvatarList(navigation)}</ListContainer>
      <Title>Team</Title>
    </MainContainer>
  );
};

export default ChatAvatarList;
