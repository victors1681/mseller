import React, {useState} from 'react';

import {SearchBar, Header} from 'react-native-elements';
import {ScrollView} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Currency from '../../common/Currency';
import {Container, SaveIcon} from './DocumentEditScreen.styled';

const GET_CLIENTS = gql`
  query CLIENTS($name: String) {
    clients(name: $name, limit: 10) {
      name
      code
      address {
        address
        city
        state
        country
      }
      financial {
        balance
      }
    }
  }
`;

const DocumentEditScreen = () => {
  const [search, setSearch] = useState('');

  const {loading, error, data} = useQuery(GET_CLIENTS, {
    variables: {name: search},
  });

  console.log('errorerror', error);

  return (
    <Container>
      <ScrollView />
    </Container>
  );
};

DocumentEditScreen.navigationOptions = ({navigation}) => {
  console.log('screenPropsscreenPropsscreenPropsscreenProps', navigation);
  return {
    title: 'New Document',
    headerRight: () => <SaveIcon onPress={() => alert('test')} />,
  };
};

export default DocumentEditScreen;
