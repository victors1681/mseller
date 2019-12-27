import React, {useEffect, useState} from 'react';
import {ListItem} from 'react-native-elements';
import {useQuery, useMutation} from '@apollo/react-hooks';
import {ActivityIndicator, FlatList} from 'react-native';
import {
  GET_BUSINESS_CHAT_USERS,
  CREATE_NEW_CHAT_ROOM,
} from '../../graphql/chatGraphql';
import EmptyAvatarListItem from '../../components/EmptyAvatarListItem';
import {useUserInfo} from '../../hooks/useUserInfo';

const ChatUserList = ({navigation}) => {
  const [userSelected, selectUser] = useState(null);
  const {userId} = useUserInfo();
  const {data, loading: loadingUsers, error} = useQuery(
    GET_BUSINESS_CHAT_USERS,
  );
  const [
    createChat,
    {data: dataMutation, loading: loadingNewChat},
  ] = useMutation(CREATE_NEW_CHAT_ROOM);

  useEffect(() => {
    if (dataMutation && dataMutation.createChat && userSelected) {
      // Navigate to the new chat Room.
      navigation.navigate('ChatRoom', {
        toUser: userSelected,
        chatId: dataMutation.createChat,
        fromNewChat: true,
      });
    }
  }, [dataMutation && dataMutation.createChat, userSelected]);

  const handleNewChatCreation = item => {
    selectUser(item);
    const chatRoom = {
      from: userId,
      to: item._id,
      status: 'NORMAL',
    };
    createChat({
      variables: {
        chat: chatRoom,
      },
    });
  };

  const renderItem = ({item}) => (
    <ListItem
      title={`${item.firstName} ${item.lastName}`}
      subtitle=""
      leftAvatar={item.avatar ? {source: {uri: item.avatar}} : null}
      leftElement={
        !item.avatar && (
          <EmptyAvatarListItem
            firstName={item.firstName}
            lastName={item.lastName}
          />
        )
      }
      bottomDivider
      chevron
      onPress={() => handleNewChatCreation(item)}
    />
  );

  console.log('datadatadatadatadata Chats users', data);
  const keyExtractor = item => item._id.toString();
  return loadingUsers || loadingNewChat ? (
    <ActivityIndicator />
  ) : (
    <FlatList
      keyExtractor={keyExtractor}
      data={data && data.usersChat}
      renderItem={renderItem}
    />
  );
};

ChatUserList.navigationOptions = ({navigation}) => ({
  title: 'New Message',
});

export default ChatUserList;
