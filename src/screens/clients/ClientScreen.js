import React, {useState} from 'react';
import {SearchBar, Header} from 'react-native-elements';
import {ScrollView} from 'react-native';
import {useQuery, useMutation} from '@apollo/react-hooks';
import Currency from '../../common/Currency';
import {Container, ListItem} from './ClientScreen.styled';
import {GET_CLIENTS, CLIENT_SELECTION} from '../../graphql/clientGraphql';

const ClientScreen = ({navigation}) => {
  const [search, setSearch] = useState('');

  const [selectClient] = useMutation(CLIENT_SELECTION);

  const {loading, error, data} = useQuery(GET_CLIENTS, {
    variables: {name: search},
  });

  const handleClientSelection = client => () => {
    const navigateTo = navigation.getParam('pickupClient')
      ? 'DocumentEdit'
      : 'ClientDetail';
    if (navigateTo === 'DocumentEdit') {
      selectClient({
        variables: {
          client,
        },
      });
    }
    navigation.navigate(navigateTo, {client});
  };

  return (
    <Container>
      <SearchBar
        lightTheme
        round
        showCancel
        showLoading={loading}
        placeholder="Client..."
        onChangeText={setSearch}
        value={search}
      />

      <ScrollView>
        {data &&
          data.clients.map((client, i) => (
            <ListItem
              rightSubtitle={<Currency value={client.financial.balance} />}
              onPress={handleClientSelection(client)}
              key={client.code}
              title={`${client.code} - ${client.name}`}
              subtitle={`${client.address.address} - ${client.address.city}`}
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
