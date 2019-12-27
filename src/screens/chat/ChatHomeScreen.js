import React, {useEffect, useState} from 'react';
import {GiftedChat, Avatar} from 'react-native-gifted-chat';
import {ListItem} from 'react-native-elements';
import {FlatList, ActivityIndicator} from 'react-native';
import {useQuery, useMutation} from '@apollo/react-hooks';
import styled from 'styled-components';
import EmptyAvatarListItem from '../../components/EmptyAvatarListItem';
import {AddIcon} from '../../common/common.styled';
import {
  GET_CHAT_MESSAGES,
  CREATE_NEW_CHAT_ROOM,
} from '../../graphql/chatGraphql';
import {useUserInfo} from '../../hooks/useUserInfo';

const ChatListItem = styled(ListItem).attrs(({theme, messageStatus}) => ({
  bottomDivider: true,
  chevron: true,
  subtitleStyle: {
    fontWeight: messageStatus === 'UNREAD' ? 'bold' : 'normal',
    fontSize: theme.font.size.regular,
  },
}))``;

const findReceptorAndEmitter = ({from, to}, userId) => ({
  from: userId === from ? to : from,
  to: userId === to ? from : to,
});

const findReceptorAndEmitterFullObj = ({fromUser, toUser}, userId) => ({
  fromUser: userId === fromUser._id ? fromUser : toUser,
  toUser: userId !== toUser._id ? toUser : fromUser,
});

const renderItem = (navigation, userId) => ({item}) => {
  console.log('itemitem', item, userId);
  const {fromUser, toUser} = findReceptorAndEmitterFullObj(item, userId);

  const avatar = toUser.avatar
    ? {
        source: {
          uri: toUser.avatar || '',
        },
      }
    : null;
  return (
    <ChatListItem
      title={toUser.name}
      subtitle={item.lastMessage || ''}
      leftAvatar={avatar}
      messageStatus={
        item.lastMessageUserId !== userId && item.lastMessageStatus
      }
      leftElement={
        !avatar && (
          <EmptyAvatarListItem
            firstName={toUser.firstName}
            lastName={toUser.lastName}
            defaultColor={toUser.defaultColor}
          />
        )
      }
      onPress={() =>
        navigation.navigate('ChatRoom', {
          toUser,
          chatId: item._id,
          lastMessageUserId: item.lastMessageUserId,
        })}
    />
  );
};

const keyExtractor = (item, index) => index.toString();

const ChatHomeScreen = ({navigation}) => {
  const {userId} = useUserInfo();
  const {data, loading, refetch} = useQuery(GET_CHAT_MESSAGES, {
    fetchPolicy: 'network-only',
  });
  useEffect(() => {
    const willFocus = navigation.addListener(
      'willFocus',
      () => refetch && refetch(),
    );
    return () => willFocus.remove();
  }, [refetch]);

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
