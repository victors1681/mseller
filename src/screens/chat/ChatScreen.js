import React, {useEffect, useState, useContext} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {NavigationContext} from 'react-navigation';
import {useQuery, useMutation, useSubscription} from '@apollo/react-hooks';
import call from 'react-native-phone-call';
import uuid from 'uuid';
import {InputAction} from '../../components/Chat';

import {
  GET_CHAT_MESSAGES,
  ADD_CHAT_MESSAGE,
  MESSAGE_SUBSCRIPTION,
} from '../../graphql/messagesGraphql';
import {CHANGE_CHAT_STATUS} from '../../graphql/chatGraphql';
import {useUserInfo} from '../../hooks/useUserInfo';
import {BackIcon, HeaderIcon} from '../../common/common.styled';

const callPhoneNumber = phone => {
  const args = {
    number: phone, // String value with the number to call
    prompt: true, // Optional boolean property. Determines if the user should be prompt prior to the call
  };

  call(args).catch(console.error);
};
const useNavigationHeader = () => {
  const navigation = useContext(NavigationContext);
  useEffect(() => {
    const fromNewChat = navigation.getParam('fromNewChat');
    const toUser = navigation.getParam('toUser');
    if (fromNewChat) {
      ChatScreen.navigationOptions = () => ({
        title: toUser.fullName,
        headerLeft: (
          <BackIcon onPress={() => navigation.navigate('ChatHome')} />
        ),
      });
    } else {
      ChatScreen.navigationOptions = () => ({
        title: toUser.fullName,
        headerRight: toUser.phone && (
          <HeaderIcon
            name="phone"
            onPress={() => callPhoneNumber(toUser.phone)}
          />
        ),
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
  // const [image, setImage] = useState(null);
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
      console.log('READDDDDD', chatId);
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
    const willFocus = navigation.addListener('didFocus', () => {
      handleChangeReadMessage();
      if (refetch) {
        refetch();
      }
    });
    return () => willFocus.remove();
  }, [refetch, lastMessageUserId, userId]);

  const setImageContent = image => {
    onSend([{text: 'image', user: {_id: userId}, image}]);
  };
  const onSend = (newMessages = []) => {
    const {
      user: {_id},
      text,
      image = null,
    } = newMessages[0];
    const currentMessage = {
      chatId,
      to: toUser._id,
      from: _id,
      type: 'TEXT',
      text,
      status: 'SENT',
      image,
    };
    addMessage({
      variables: {
        message: currentMessage,
      },
    });
    const alterMessage = [{...newMessages[0], image}];
    setMessages(GiftedChat.append(messages, alterMessage));
  };

  return (
    <GiftedChat
      renderActions={() => (
        <InputAction chatId={chatId} contentCallback={setImageContent} />
      )}
      onPressAvatar={() => console.log('Avatar pressed')}
      isLoadingEarlier={loading}
      textInputProps={{autoFocus: true}}
      messages={messages}
      onSend={msgs => onSend(msgs)}
      user={{
        _id: userId,
        avatar: userInfo.avatar,
        name: getFullUserName(),
      }}
    />
  );
};

export default ChatScreen;
