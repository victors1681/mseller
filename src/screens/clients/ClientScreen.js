import React, {useState} from 'react';
import {SearchBar, Header} from 'react-native-elements';
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

  const {loading, error, data} = useQuery(GET_CLIENTS, {
    variables: {name: search},
  });

  console.log('errorerror', error);

  return (
    <Container>
      {/* <Header
        leftComponent={{icon: 'menu'}}
        centerComponent={{text: 'Clients'}}
        rightComponent={{icon: 'home'}}
      /> */}
      <SearchBar
        lightTheme
        round
        showCancel
        showLoading={loading}
        // onRefresh={refetch}
        placeholder="Client..."
        onChangeText={setSearch}
        value={search}
      />

      <ScrollView>
        {data &&
          data.clients.map((l, i) => (
            <ListItem
              rightSubtitle={<Currency value={l.financial.balance} />}
              onPress={() => console.log('pressed')}
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
ClientScreen.navigationOptions = {
  title: 'Clients',
};

export default ClientScreen;
