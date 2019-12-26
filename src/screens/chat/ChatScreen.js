import React, {useEffect, useState, useContext} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {NavigationContext} from 'react-navigation';
import {useQuery, useMutation, useSubscription} from '@apollo/react-hooks';
import {
  GET_CHAT_MESSAGES,
  ADD_CHAT_MESSAGE,
  MESSAGE_SUBSCRIPTION,
} from '../../graphql/messagesGraphql';
import {useUserInfo} from '../../hooks/useUserInfo';
import {BackIcon} from '../../common/common.styled';

const useNavigationHeader = () => {
  const navigation = useContext(NavigationContext);
  useEffect(() => {
    const fromNewMessage = navigation.getParam('fromNewMessage');
    const toUser = navigation.getParam('toUser');
    if (fromNewMessage) {
      ChatScreen.navigationOptions = () => ({
        headerLeft: (
          <BackIcon onPress={() => navigation.navigate('ChatHome')} />
        ),
      });
    }
    ChatScreen.navigationOptions = () => ({
      title: toUser.name,
    });
  }, []);
};

const ChatScreen = ({navigation}) => {
  useNavigationHeader();
  const toUser = navigation.getParam('toUser');

  const [messages, setMessages] = useState([]);
  const {userInfo, userId, getFullUserName} = useUserInfo();
  const [addMessage] = useMutation(ADD_CHAT_MESSAGE);
  const {data: initialData, loading, refetch} = useQuery(GET_CHAT_MESSAGES);
  const {data: dataSubscription, error} = useSubscription(
    MESSAGE_SUBSCRIPTION,
    {
      variables: {
        userId, // current user
        listenForUserId: toUser._id, // against user
      },
    },
  );
  console.log('initialData', initialData, dataSubscription);

  console.log('toUsertoUser', toUser);

  useEffect(() => {
    if (initialData) {
      setMessages([...messages, ...initialData.messages]);
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

  const onSend = (newMessages = []) => {
    console.log('msgsmsgs', newMessages);
    const {
      user: {_id},
      text,
    } = newMessages[0];
    const currentMessage = {
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
