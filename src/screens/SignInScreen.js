import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useMutation} from '@apollo/react-hooks';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {PERFORM_LOGIN} from '../graphql/signInSGraphql';
import {UPDATE_CURRENT_USER} from '../graphql/userGraphql';
import useTheme from '../hooks/useTheme';
import {useUserInfo} from '../hooks/useUserInfo';
import {
  LoginContainer,
  LoginHeader,
  FormInput,
  LoginFooter,
  LoginButton,
  LoginInput,
  KeyboardAvoidingView,
  Logo,
  Headline,
  PoweredBy,
} from './SignInScreen.styled';
import Toast from '../components/Toast';
import {setToken, setUserId} from '../utils/localStore';

const LoginValidation = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string().required(),
});
const SignIn = ({navigation}) => {
  const theme = useTheme();
  const {updateUserInfo} = useUserInfo();
  const [updateTodo, {data, loading, error}] = useMutation(PERFORM_LOGIN, {
    errorPolicy: 'all',
  });

  const handleLogin = ({email, password}) => {
    console.log('Access', email, password);
    updateTodo({
      variables: {
        email,
        password,
      },
    });
  };

  useEffect(() => {
    if (data && data.login.token) {
      setToken(data.login.token);
      setUserId(data.login._id);
      updateUserInfo(data.login);

      navigation.navigate('App', {userInfo: data.login});
    }

    if (loading) {
      console.log('IS LOADING!!!!!!');
    }
  }, [data, error, loading, navigation]);

  return (
    <Formik
      initialValues={{email: '', password: ''}}
      onSubmit={handleLogin}
      validationSchema={LoginValidation}>
      {({handleChange, handleBlur, handleSubmit, values, errors, touched}) => (
        <LoginContainer>
          <KeyboardAvoidingView>
            {error && <Toast error={error} />}
            <LoginHeader>
              <Logo />
            </LoginHeader>

            <FormInput>
              <LoginInput
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="email@domain.com"
                label="email"
                leftIcon={
                  <Icon name="account" size={24} color={theme.colors.grey2} />
                }
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                errorMessage={errors.email && touched.email && errors.email}
              />
              <LoginInput
                secureTextEntry
                type="password"
                placeholder="Password"
                label="password"
                leftIcon={
                  <Icon name="lock" size={24} color={theme.colors.grey2} />
                }
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                onSubmitEditing={handleSubmit}
                errorMessage={
                  errors.password && touched.password && errors.password
                }
              />
              <LoginButton
                title="Login"
                onPress={handleSubmit}
                loading={loading}
              />
            </FormInput>

            <LoginFooter>
              <Headline>
                Made for professional sellers - www.mseller.app
              </Headline>
              <PoweredBy>Powered by ITSoluclick</PoweredBy>
            </LoginFooter>
          </KeyboardAvoidingView>
        </LoginContainer>
      )}
    </Formik>
  );
};

export default SignIn;
