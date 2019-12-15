import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../constants/Colors';

export default function TabBarIcon(props) {
  // eslint-disable-next-line react-native/no-inline-styles
  return (
    <Icon
      name={props.name}
      size={26}
      style={{marginBottom: -3}}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}
