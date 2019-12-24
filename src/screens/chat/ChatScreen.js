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
    if (fromNewMessage) {
      ChatScreen.navigationOptions = () => ({
        headerLeft: (
          <BackIcon onPress={() => navigation.navigate('ChatHome')} />
        ),
      });
    }
  }, []);
};

const ChatScreen = ({navigation}) => {
  const [messages, setMessages] = useState([]);

  const {data: initialData, loading, error, refetch} = useQuery(
    GET_CHAT_MESSAGES,
  );
  const {data: dataSubscription} = useSubscription(MESSAGE_SUBSCRIPTION);
  const [addMessage] = useMutation(ADD_CHAT_MESSAGE);

  const receiverUserInfo =
    {_id: '5dfff5f9c50aec7a8635a802'} || navigation.getParam('userInfo');

  const {userInfo, userId} = useUserInfo();

  useNavigationHeader();

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
  }, [dataSubscription && dataSubscription._id]);

  const onSend = (newMessages = []) => {
    console.log('msgsmsgs', newMessages);
    const {
      user: {_id},
      text,
    } = newMessages[0];
    const currentMessage = {
      to: receiverUserInfo._id,
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
      }}
    />
  );
};

export default ChatScreen;
