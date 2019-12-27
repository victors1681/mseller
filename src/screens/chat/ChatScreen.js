import React, {useEffect, useState, useContext} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {NavigationContext} from 'react-navigation';
import {useQuery, useMutation, useSubscription} from '@apollo/react-hooks';
import {
  GET_CHAT_MESSAGES,
  ADD_CHAT_MESSAGE,
  MESSAGE_SUBSCRIPTION,
} from '../../graphql/messagesGraphql';
import {CHANGE_CHAT_STATUS} from '../../graphql/chatGraphql';
import {useUserInfo} from '../../hooks/useUserInfo';
import {BackIcon} from '../../common/common.styled';

const useNavigationHeader = () => {
  const navigation = useContext(NavigationContext);
  useEffect(() => {
    const fromNewChat = navigation.getParam('fromNewChat');
    const toUser = navigation.getParam('toUser');
    if (fromNewChat) {
      ChatScreen.navigationOptions = () => ({
        title: toUser.name || `${toUser.firstName} ${toUser.lastName}`,
        headerLeft: (
          <BackIcon onPress={() => navigation.navigate('ChatHome')} />
        ),
      });
    } else {
      ChatScreen.navigationOptions = () => ({
        title: toUser.name,
      });
    }
  }, []);
};

const ChatScreen = ({navigation}) => {
  useNavigationHeader();
  const toUser = navigation.getParam('toUser');
  const chatId = navigation.getParam('chatId');
  const lastMessageUserId = navigation.getParam('lastMessageUserId');

  const [messages, setMessages] = useState([]);
  const {userInfo, userId, getFullUserName} = useUserInfo();
  const [addMessage] = useMutation(ADD_CHAT_MESSAGE);
  const [changeChatStatus] = useMutation(CHANGE_CHAT_STATUS);

  const {data: initialData, loading, refetch} = useQuery(GET_CHAT_MESSAGES, {
    variables: {
      chatId,
    },
    fetchPolicy: 'network-only',
  });

  const {data: dataSubscription} = useSubscription(MESSAGE_SUBSCRIPTION, {
    variables: {
      userId, // current user
      listenForUserId: toUser._id, // against user
    },
  });

  const handleChangeReadMessage = () => {
    if (lastMessageUserId !== userId) {
      changeChatStatus({variables: {chatId, status: 'READ'}});
    }
  };

  useEffect(() => {
    if (initialData) {
      setMessages([...messages, ...initialData.messages]);
      handleChangeReadMessage();
    }
  }, [initialData && initialData.messages]);

  // Update from the subscription
  useEffect(() => {
    if (dataSubscription) {
      setMessages([dataSubscription.newMessageAdded, ...messages]);
    }
  }, [
    dataSubscription &&
      dataSubscription.newMessageAdded &&
      dataSubscription.newMessageAdded._id,
  ]);

  // Make all messages read from the current user
  useEffect(() => {
    const willFocus = navigation.addListener('willFocus', () => {
      handleChangeReadMessage();
      if (refetch) {
        refetch();
      }
    });
    return () => willFocus.remove();
  }, [refetch, lastMessageUserId, userId]);

  const onSend = (newMessages = []) => {
    const {
      user: {_id},
      text,
    } = newMessages[0];
    const currentMessage = {
      chatId,
      to: toUser._id,
      from: _id,
      type: 'TEXT',
      text,
      status: 'SENT',
    };
    addMessage({
      variables: {
        message: currentMessage,
      },
    });
    setMessages(GiftedChat.append(messages, newMessages));
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={msgs => onSend(msgs)}
      isLoadingEarlier={loading}
      user={{
        _id: userId,
        avatar: userInfo.avatar,
        name: getFullUserName(),
      }}
    />
  );
};

export default ChatScreen;
