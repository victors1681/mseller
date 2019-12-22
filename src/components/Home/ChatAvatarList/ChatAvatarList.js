import React from 'react';
import {
  ListContainer,
  UserAvatar,
  MainContainer,
  Title,
  UserName,
  AvatarWrapper,
} from './ChatAvatarList.style';

const getAvatarList = () => {
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
        />
        <UserName>Victor</UserName>
      </AvatarWrapper>,
    );
  }
  return list;
};
const ChatAvatarList = () => (
  <MainContainer>
    <ListContainer>{getAvatarList()}</ListContainer>
    <Title>Team</Title>
  </MainContainer>
);

export default ChatAvatarList;
