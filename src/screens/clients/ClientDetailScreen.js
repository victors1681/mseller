import React, {useState} from 'react';
import {SearchBar, Header} from 'react-native-elements';
import {ScrollView} from 'react-native';
import {useQuery, useMutation} from '@apollo/react-hooks';
import get from 'lodash/get';
import Currency from '../../common/Currency';
import {Container, Card, ClientName} from './ClientDetailScreen.styled';
import Loading from '../../components/Loading';
import {GET_CLIENT} from '../../graphql/clientGraphql';

const ClientDetailScreen = ({navigation}) => {
  const clientCode = navigation.getParam('client').code;

  const {loading, error, data} = useQuery(GET_CLIENT, {
    variables: {code: clientCode},
  });

  console.log('datadatadata', data);
  const handleClientSelection = client => () => {
    const navigateTo = navigation.getParam('pickupClient');

    navigation.navigate(navigateTo, {client});
  };

  const clientName = get(data, 'client.name', '');
  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView>
          <Card>
            <ClientName>{clientName}</ClientName>
          </Card>
        </ScrollView>
      )}
    </Container>
  );
};
ClientDetailScreen.navigationOptions = ({navigation}) => ({
  title: navigation.getParam('client').name,
});

export default ClientDetailScreen;
