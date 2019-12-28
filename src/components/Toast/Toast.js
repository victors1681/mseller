import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {Animated, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Container = styled.SafeAreaView`
  width: 100%;
  position: absolute;
  background: ${({theme}) => theme.colors.error};
`;
const AnimationWrapper = styled(Animated.View).attrs({
  shadowColor: 'black',
  shadowOffset: {height: 20},
})`
  flex-direction: row;
  background: ${({theme}) => theme.colors.error};
  z-index: 1;
  width: 100%;
  justify-content: center;
`;

const ErrorText = styled(Text)`
  color: white;
  margin: 8px;
  font-weight: bold;
`;

const NetworkIcon = styled(Icon).attrs({
  name: 'lan-disconnect',
  size: 20,
})`
  color: white;
  margin: 8px;
  margin-left: 13px;
`;

const MessageContainer = styled.View`
  flex-direction: row;
  padding-right: 25px;
`;

export const ErrorToast = ({
  errors: {error, errorType},
  handleUnMountErrors,
}) => {
  const [fadeAnim] = useState(new Animated.Value(0)); //
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 0.9,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          // unmount component
          handleUnMountErrors(null);
        });
      }, 20000);
    });
  }, []);

  const renderGraphQlErrors = () =>
    error &&
    error.map(({message, locations, path, extensions: {code}}, i) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}, Code: ${code}`,
      );

      return (
        <TouchableOpacity key={i} onPress={() => handleUnMountErrors()}>
          <ErrorText>{`${message} | code: ${code}`}</ErrorText>
        </TouchableOpacity>
      );
    });

  const renderNetworkError = () => {
    return (
      <TouchableOpacity onPress={() => handleUnMountErrors()}>
        <MessageContainer>
          <NetworkIcon />
          <ErrorText>{`${error}`}</ErrorText>
        </MessageContainer>
      </TouchableOpacity>
    );
  };

  return (
    <AnimationWrapper
      style={{
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      <Container>
        {errorType === 'network' ? renderNetworkError() : renderGraphQlErrors()}
      </Container>
    </AnimationWrapper>
  );
};

export default ErrorToast;
