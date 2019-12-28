import React, {useState, useContext} from 'react';
import head from 'lodash/head';

export const MainContext = React.createContext();

export const MainProvider = ({children}) => {
  const [persistor, setPersistor] = useState();
  const [apolloClient, setApolloClient] = useState();

  const initialValues = {
    persistor,
    apolloClient,
    setPersistor,
    setApolloClient,
  };

  return (
    <MainContext.Provider value={initialValues}>
      {children}
    </MainContext.Provider>
  );
};
