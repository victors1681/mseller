import React, {useEffect} from 'react';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useMutation} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';
import {Formik} from 'formik';
import * as Yup from 'yup';
import useTheme from '../hooks/useTheme';
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
  MsellerLink,
} from './SignInScreen.styled';
import Toast from '../components/Toast';
import {setToken} from '../utils/localStore';

const performLogin = gql`
  mutation LOGIN($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const LoginValidation = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string().required(),
});
const SignIn = ({navigation}) => {
  const theme = useTheme();
  const [updateTodo, {data, loading, error}] = useMutation(performLogin, {
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
      navigation.navigate('App');
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
