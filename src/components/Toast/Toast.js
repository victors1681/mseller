import React from 'react';
import styled from 'styled-components/native';
import {Text} from 'react-native-elements';

const Container = styled.View.attrs({
  shadowColor: 'black',
  shadowOffset: {height: 20},
})`
  padding: 20px;
  background: ${({theme}) => theme.colors.error};
  position: absolute;
  z-index: 1;
  width: 100%;
`;

const ErrorText = styled(Text)`
  color: white;
  text-align: center;
`;

const Toast = ({message, type = 'error', error}) => {
  if (error && type === 'error') {
    return (
      <Container>
        {error.graphQLErrors &&
          error.graphQLErrors.map(({m}, i) => (
            <ErrorText key={i}>{m}</ErrorText>
          ))}
      </Container>
    );
  }
  return <Text>{message}</Text>;
};

export default Toast;
