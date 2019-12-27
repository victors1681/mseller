import React, {useContext} from 'react';
import {NavigationContext} from 'react-navigation';
import {useQuery} from '@apollo/react-hooks';
import get from 'lodash/get';
import {ActivityIndicator} from 'react-native';
import {GET_OPEN_CHATS} from '../../../graphql/chatGraphql';
import {findReceptorAndEmitterFullObj} from '../../../screens/chat/helper/chatHelper';
import {useUserInfo} from '../../../hooks/useUserInfo';
import {
  ListContainer,
  UserAvatar,
  MainContainer,
  Title,
  UserName,
  AvatarWrapper,
} from './ChatAvatarList.style';

const getAvatarList = (navigation, data, userId) => {
  let userChats = [];
  userChats =
    data &&
    data.chats.map(chat => {
      const {toUser} = findReceptorAndEmitterFullObj(chat, userId);
      const avatar = toUser.avatar ? {uri: toUser.avatar || ''} : null;
      const lastMessageUserId = get(chat, 'lastMessage.userId');
      return (
        <AvatarWrapper key={chat._id}>
          <UserAvatar
            overlayContainerStyle={{backgroundColor: toUser.defaultColor}}
            source={avatar}
            title={toUser.initials}
            onPress={() =>
              navigation.navigate('ChatRoom', {
                toUser,
                chatId: chat._id,
                lastMessageUserId,
              })}
          />
          <UserName>{toUser.firstName}</UserName>
        </AvatarWrapper>
      );
    });

  userChats.push(
    <AvatarWrapper key="new-chat_">
      <UserAvatar
        icon={{name: 'account-multiple-plus', type: 'material-community'}}
        onPress={() => navigation.navigate('NewChatRoom')}
      />
      <UserName>New Chat</UserName>
    </AvatarWrapper>,
  );

  return userChats;
};
const ChatAvatarList = () => {
  const {userId} = useUserInfo();
  const navigation = useContext(NavigationContext);
  const {data, loading, ...rest} = useQuery(GET_OPEN_CHATS, {
    fetchPolicy: 'network-only',
  });

  return loading && !data ? (
    <ActivityIndicator />
  ) : (
    <MainContainer>
      <ListContainer>{getAvatarList(navigation, data, userId)}</ListContainer>
      <Title>Team</Title>
    </MainContainer>
  );
};

export default ChatAvatarList;
