import React, {useState} from 'react';
import {SearchBar, Header} from 'react-native-elements';
import {ScrollView} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Currency from '../../common/Currency';
import {Container, ListItem} from './DocumentScreen.styled';

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

const DocumentScreen = () => {
  const [search, setSearch] = useState('');

  const {loading, error, data} = useQuery(GET_CLIENTS, {
    variables: {name: search},
  });

  console.log('errorerror', error);

  return (
    <Container>
      <Header
        leftComponent={{icon: 'clear'}}
        centerComponent={{text: 'Order'}}
        rightComponent={{icon: 'save'}}
      />

      <ScrollView />
    </Container>
  );
};

export default DocumentScreen;
