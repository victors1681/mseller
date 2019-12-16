import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';
import Colors from '../constants/Colors';

const CustomIcon = styled(Icon)`
  margin-bottom: -3px;
`;
export default function TabBarIcon(props) {
  // eslint-disable-next-line react-native/no-inline-styles
  return (
    <CustomIcon
      name={props.name}
      size={26}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}
