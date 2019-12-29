import React, {useState, useContext} from 'react';
import {ErrorToast} from '../components/Toast';

export const MainContext = React.createContext();

export const MainProvider = ({children}) => {
  const [persistor, setPersistor] = useState();
  const [apolloClient, setApolloClient] = useState();
  const [accessToken, setAccessToken] = useState(null);
  const [errors, setErrors] = useState(null);

  const handleUnMountErrors = () => setErrors(null);
  const showErrors = e => setErrors(e);
  const initialValues = {
    persistor,
    apolloClient,
    setPersistor,
    setApolloClient,
    accessToken,
    setAccessToken,
    showErrors,
  };

  return (
    <MainContext.Provider value={initialValues}>
      {errors && (
        <ErrorToast errors={errors} handleUnMountErrors={handleUnMountErrors} />
      )}
      {children}
    </MainContext.Provider>
  );
};
