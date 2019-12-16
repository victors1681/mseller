import styled from 'styled-components/native';
import {Input, Button} from 'react-native-elements';
import {KeyboardAvoidingView as KAV} from 'react-native';

export const KeyboardAvoidingView = styled(KAV)`
  flex: 1;
`;

export const LoginContainer = styled.View`
  flex: 1;
`;

export const LoginHeader = styled.View`
  flex: 2;
`;

export const FormInput = styled.View`
  margin: 20px;
  flex: 1;
`;

export const LoginFooter = styled.View`
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 20px;
  flex: 1;
`;

export const LoginInput = styled(Input).attrs(({theme}) => ({
  containerStyle: {marginTop: 10},
  labelStyle: {fontWeight: 'normal', fontSize: theme.font.size.small},
}))`
  margin-top: 20px;
`;

export const LoginButton = styled(Button)`
  margin-top: 20px;
`;
