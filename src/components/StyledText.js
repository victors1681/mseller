import React from 'react';
import {Text} from 'react-native';

export function MonoText(props) {
  // eslint-disable-next-line react-native/no-inline-styles
  return <Text {...props} style={props.style} />;
}
