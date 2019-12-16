import React, {useState} from 'react';
import {SearchBar} from 'react-native-elements';
import {ScrollView} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Currency from '../../common/Currency';
import {Container, ListItem} from './ClientScreen.styled';

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

const ClientScreen = () => {
  const [search, setSearch] = useState('');

  const {loading, error, data, refetch} = useQuery(GET_CLIENTS, {
    variables: {name: search},
  });

  return (
    <Container>
      <SearchBar
        // onRefresh={refetch}
        placeholder="Type Here..."
        onChangeText={setSearch}
        value={search}
      />

      <ScrollView>
        {data &&
          data.clients.map((l, i) => (
            <ListItem
              rightSubtitle={<Currency value={l.financial.balance} />}
              onPress={() => console.log('HEAYY')}
              key={i}
              title={`${l.code} - ${l.name}`}
              subtitle={`${l.address.address} - ${l.address.city}`}
              bottomDivider
            />
          ))}
      </ScrollView>
    </Container>
  );
};

export default ClientScreen;
