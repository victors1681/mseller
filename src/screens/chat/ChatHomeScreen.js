import React, {useEffect, useState} from 'react';
import {GiftedChat, Avatar} from 'react-native-gifted-chat';
import {ListItem} from 'react-native-elements';
import styled from 'styled-components/native';
import head from 'lodash/head';

import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useQuery, useMutation} from '@apollo/react-hooks';
import {AddIcon} from '../../common/common.styled';
import {
  GET_CHAT_MESSAGES,
  CREATE_NEW_CHAT_ROOM,
} from '../../graphql/chatGraphql';
import {useUserInfo} from '../../hooks/useUserInfo';

const findReceptorAndEmitter = ({from, to}, userId) => ({
  from: userId === from ? to : from,
  to: userId === to ? from : to,
});

const findReceptorAndEmitterFullObj = ({fromUser, toUser}, userId) => ({
  fromUser: userId === fromUser._id ? fromUser : toUser,
  toUser: userId !== toUser._id ? toUser : fromUser,
});

const AvatarContainer = styled.View`
  width: 40px;
  height: 40px;
  background-color: red;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;
const AvatarText = styled.Text`
  color: white;
  font-size: ${({theme}) => theme.font.size.large};
`;
const RenderEmptyAvatar = ({firstName, lastName}) => {
  const initals = `${head(firstName, '')}.${head(lastName, '')}`;
  return (
    <AvatarContainer>
      <AvatarText>{initals}</AvatarText>
    </AvatarContainer>
  );
};

const renderItem = (navigation, userId) => ({item}) => {
  console.log('itemitem', item, userId);
  const {fromUser, toUser} = findReceptorAndEmitterFullObj(item, userId);

  console.log('USERRR', item);
  const avatar = toUser.avatar
    ? {
        source: {
          uri: toUser.avatar || '',
        },
      }
    : null;
  return (
    <ListItem
      title={toUser.name}
      subtitle={item.lastMessage || ''}
      leftAvatar={avatar}
      leftElement={
        !avatar && (
          <RenderEmptyAvatar
            firstName={toUser.firstName}
            lastName={toUser.lastName}
          />
        )
      }
      bottomDivider
      chevron
      onPress={() => navigation.navigate('ChatRoom', {toUser})}
    />
  );
};

const keyExtractor = (item, index) => index.toString();

const ChatHomeScreen = ({navigation}) => {
  const {userId} = useUserInfo();
  const {data, loading, error} = useQuery(GET_CHAT_MESSAGES);

  console.log('datadatadata', data);
  return loading ? (
    <ActivityIndicator />
  ) : (
    <FlatList
      keyExtractor={keyExtractor}
      data={data && data.chats}
      renderItem={renderItem(navigation, userId)}
    />
  );
};

ChatHomeScreen.navigationOptions = ({navigation}) => ({
  title: 'Chats',
  headerRight: () => (
    <AddIcon onPress={() => navigation.navigate('NewChatRoom')} />
  ),
});

export default ChatHomeScreen;
