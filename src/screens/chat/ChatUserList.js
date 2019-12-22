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
  {
    name: 'Chris Jackson',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman',
  },
  {
    name: 'Chris Jackson',
    avatar_url:
      'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman',
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
    onPress={() =>
      navigation.navigate('ChatRoom', {userInfo: item, fromNewMessage: true})}
  />
);

const keyExtractor = (item, index) => index.toString();

const ChatUserList = ({navigation}) => {
  return (
    <FlatList
      keyExtractor={keyExtractor}
      data={list}
      renderItem={renderItem(navigation)}
    />
  );
};

ChatUserList.navigationOptions = ({navigation}) => ({
  title: 'New Message',
});

export default ChatUserList;
