import React, {useEffect, useState} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {ListItem} from 'react-native-elements';
import {StyleSheet, Text, View, Image, FlatList} from 'react-native';
import {AddIcon} from '../../common/common.styled';

const list = [
  {
    name: 'Amy Farha',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President',
  },
  {
    name: 'Chris Jackson',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman',
  },
];

const renderItem = navigation => ({item}) => (
  <ListItem
    title={item.name}
    subtitle={item.subtitle}
    leftAvatar={{source: {uri: item.avatar_url}}}
    bottomDivider
    chevron
    onPress={() => navigation.navigate('ChatRoom', {userInfo: item})}
  />
);

const keyExtractor = (item, index) => index.toString();

const ChatHomeScreen = ({navigation}) => {
  return (
    <FlatList
      keyExtractor={keyExtractor}
      data={list}
      renderItem={renderItem(navigation)}
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
