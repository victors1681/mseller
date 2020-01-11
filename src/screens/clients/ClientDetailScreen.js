import React, {useState} from 'react';
import {Divider, ListItem} from 'react-native-elements';
import {ScrollView} from 'react-native';
import {useQuery, useMutation} from '@apollo/react-hooks';
import get from 'lodash/get';
import {ClientName} from './ClientDetailScreen.styled';
import {Grid, DisplayText, Card, Container} from '../../common';
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
  const code = get(data, 'client.code', '');
  const email = get(data, 'client.email', '');
  const fax = get(data, 'client.fax', '');
  const phone = get(data, 'client.phone', '');
  const address = get(data, 'client.address', '');
  const observations = get(data, 'client.observations', '');
  const status = get(data, 'client.status', '');
  const contacts = get(data, 'client.contacts', []);

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView>
          <Card>
            <ClientName>{clientName}</ClientName>
            <Grid>
              <DisplayText label="status" value={status} />
              <Grid.Row>
                <Grid.Column>
                  <DisplayText label="Code" value={code} />
                </Grid.Column>
                <Grid.Column>
                  <DisplayText label="Email" value={email} />
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <DisplayText label="Phone" value={phone} />
                </Grid.Column>
                <Grid.Column>
                  <DisplayText label="Fax" value={fax} />
                </Grid.Column>
              </Grid.Row>

              <Divider />
              <Grid.Row>
                <Grid.Column>
                  <DisplayText label="Address" value={address.address} />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column>
                  <DisplayText label="City" value={address.city} />
                </Grid.Column>
                <Grid.Column>
                  <DisplayText label="State" value={address.state} />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column>
                  <DisplayText label="State" value={address.state} />
                </Grid.Column>
                <Grid.Column>
                  <DisplayText label="Country" value={address.country} />
                </Grid.Column>
              </Grid.Row>
              <Divider />

              <Grid.Row>
                <Grid.Column>
                  <DisplayText label="Observations" value={observations} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Card>

          <Card title="Contacts">
            {contacts.map((l, i) => (
              <ListItem
                key={i}
                title={l.name}
                subtitle={l.email}
                rightTitle={l.phone}
                rightSubtitle={l.mobile}
                bottomDivider
              />
            ))}
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