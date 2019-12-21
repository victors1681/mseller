import styled from 'styled-components/native';
import {Input, Button} from 'react-native-elements';
import {KeyboardAvoidingView as KAV, Platform} from 'react-native';
import msellerLogo from '../assets/images/mseller-logo.png';

export const KeyboardAvoidingView = styled(KAV).attrs({
  behavior: Platform.OS === 'ios' ? 'padding' : null,
})`
  flex: 1;
`;

export const LoginContainer = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
`;

export const LoginHeader = styled.View`
  flex: 1;
  margin: 20px;
  justify-content: center;
  align-items: center;
  max-height: 30%;
`;

export const FormInput = styled.View`
  margin: 20px;
  margin-left: 10%;
  margin-right: 10%;
  height: 250px;
`;

export const LoginFooter = styled.View`
  margin-top: auto;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 20px;
  color: ${({theme}) => theme.colors.darkGray};
  height: 30px;
`;

export const PoweredBy = styled.Text`
  color: ${({theme}) => theme.colors.darkGray};
  font-size: ${({theme}) => theme.font.size.regular};
`;

export const LoginInput = styled(Input).attrs(({theme}) => ({
  containerStyle: {marginTop: 10},
  labelStyle: {
    fontWeight: 'normal',
    fontSize: theme.font.size.small,
  },
  inputStyle: {
    fontSize: theme.font.size.medium,
  },
}))`
  margin-top: 20px;
`;

export const LoginButton = styled(Button).attrs(({theme}) => ({
  titleStyle: {
    fontSize: theme.font.size.medium,
    margin: 4,
  },
  containerStyle: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
}))``;

export const Headline = styled.Text`
  color: ${({theme}) => theme.colors.darkGray};
  font-size: ${({theme}) => theme.font.size.regular};
`;

export const Logo = styled.Image.attrs({
  source: msellerLogo,
  resizemode: 'cover',
})`
  height: 40px;
  width: 200px;
`;
