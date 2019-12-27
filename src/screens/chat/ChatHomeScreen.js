import React, {useEffect, useState} from 'react';
import {GiftedChat, Avatar} from 'react-native-gifted-chat';
import {ListItem} from 'react-native-elements';
import {FlatList, ActivityIndicator} from 'react-native';
import {useQuery, useMutation} from '@apollo/react-hooks';
import styled from 'styled-components';
import moment from 'moment';
import {
  getLastMessageInfo,
  findReceptorAndEmitterFullObj,
} from './helper/chatHelper';
import EmptyAvatarListItem from '../../components/EmptyAvatarListItem';
import {AddIcon} from '../../common/common.styled';
import {GET_CHAT_MESSAGES} from '../../graphql/chatGraphql';
import {useUserInfo} from '../../hooks/useUserInfo';

const ChatListItem = styled(ListItem).attrs(({theme, messageStatus}) => ({
  bottomDivider: true,
  chevron: true,
  subtitleStyle: {
    fontWeight: messageStatus === 'UNREAD' ? 'bold' : 'normal',
    fontSize: theme.font.size.regular,
  },
  rightSubtitleStyle: {
    fontSize: theme.font.size.small,
  },
}))``;

const renderItem = (navigation, userId) => ({item}) => {
  const {toUser} = findReceptorAndEmitterFullObj(item, userId);
  const {
    lastMessageUserId,
    lastMessageText,
    lastMessageStatus,
    lastMessageDate,
  } = getLastMessageInfo(item.lastMessage);
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
      subtitle={lastMessageText}
      leftAvatar={avatar}
      rightSubtitle={moment(lastMessageDate).fromNow()}
      messageStatus={lastMessageUserId !== userId && lastMessageStatus}
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
          lastMessageUserId,
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
      'didFocus',
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
