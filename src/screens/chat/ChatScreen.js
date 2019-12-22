import React, {useEffect, useState, useContext} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {NavigationContext} from 'react-navigation';
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
  const userInfo = navigation.getParam('userInfo');

  useNavigationHeader();

  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: `Hello ${userInfo.name}`,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
    },
  ]);

  const onSend = (newMessages = []) => {
    setMessages(GiftedChat.append(messages, newMessages));
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={msgs => onSend(msgs)}
      user={{
        _id: 1,
      }}
    />
  );
};

export default ChatScreen;
