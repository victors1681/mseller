import React, {useEffect} from 'react';
import {ListItem} from 'react-native-elements';
import {FlatList, ActivityIndicator} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import styled from 'styled-components';
import moment from 'moment';
import get from 'lodash/get';
import {
  getLastMessageInfo,
  findReceptorAndEmitterFullObj,
} from './helper/chatHelper';
import EmptyAvatarListItem from '../../components/EmptyAvatarListItem';
import {AddIcon} from '../../common/common.styled';
import {GET_OPEN_CHATS} from '../../graphql/chatGraphql';
import {useUserInfo} from '../../hooks/useUserInfo';

const ChatListItem = styled(ListItem).attrs(({theme, unread}) => ({
  bottomDivider: true,
  chevron: true,
  subtitleStyle: {
    fontWeight: unread ? 'bold' : 'normal',
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
      title={toUser.fullName}
      subtitle={lastMessageText}
      leftAvatar={avatar}
      rightSubtitle={moment(lastMessageDate).fromNow()}
      unread={lastMessageUserId !== userId && lastMessageStatus === 'UNREAD'}
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
  const {data, loading, ...rest} = useQuery(GET_OPEN_CHATS, {
    fetchPolicy: 'network-only',
  });
  const refetch = get(rest, 'refetch'); // avoiding issue

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
