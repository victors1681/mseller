import React, {useState} from 'react';
import {Divider} from 'react-native-elements';
import {ScrollView} from 'react-native';
import {useQuery, useMutation} from '@apollo/react-hooks';
import get from 'lodash/get';
import {FinanceButton} from '../../components/Home';
import {
  ClientName,
  ClientSuspendedLabel,
  ContactList,
  FinanceWrapper,
} from './ClientDetailScreen.styled';
import {Grid, DisplayText, Card, Container} from '../../common';
import Loading from '../../components/Loading';
import {GET_CLIENT} from '../../graphql/clientGraphql';
import Map from '../../components/Map';

const ClientSuspended = ({status = 'A'}) =>
  status === 'S' ? (
    <ClientSuspendedLabel>Client Suspended</ClientSuspendedLabel>
  ) : null;

export const ClientContacts = ({contacts}) => (
  <Card title="Contacts">
    {contacts.map((l, i) => (
      <ContactList
        key={i}
        title={l.name}
        subtitle={l.email}
        rightTitle={`P: ${l.phone}`}
        rightSubtitle={`M: ${l.mobile}`}
        bottomDivider
      />
    ))}
  </Card>
);
const ClientDetailScreen = ({navigation}) => {
  const clientCode = navigation.getParam('client').code;

  const {loading, error, data} = useQuery(GET_CLIENT, {
    variables: {code: clientCode},
  });

  const handleClientSelection = client => () => {
    const navigateTo = navigation.getParam('pickupClient');

    navigation.navigate(navigateTo, {client});
  };

  const clientName = get(data, 'client.name', '');
  const code = get(data, 'client.code', '');
  const email = get(data, 'client.email', '');
  const fax = get(data, 'client.fax', '');
  const phone = get(data, 'client.phonePrimary', '');
  const address = get(data, 'client.address', '');
  const observations = get(data, 'client.observations', '');
  const identification = get(data, 'client.identification', '');
  const status = get(data, 'client.status', '');
  const geoLocation = get(data, 'client.geoLocation.location.coordinates');
  const contacts = get(data, 'client.internalContacts', []);

  const renderMarker = () => {
    if (geoLocation && geoLocation.length) {
      return [
        {
          title: `${code}-${clientName}`,
          description: phone,
          coords: {longitude: geoLocation[0], latitude: geoLocation[1]},
        },
      ];
    }

    return null;
  };

  const getInitialRegion = () => {
    return {
      longitude: geoLocation && geoLocation[0],
      latitude: geoLocation && geoLocation[1],
      latitudeDelta: 0.0422,
      longitudeDelta: 0.0221,
    };
  };
  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView>
          <Card>
            <ClientSuspended status={status} />
            <ClientName>{clientName}</ClientName>
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <DisplayText label="Code" value={code} />
                </Grid.Column>
                <Grid.Column>
                  <DisplayText label="Identification" value={identification} />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column>
                  <DisplayText capitalize={false} label="Email" value={email} />
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
          <Card title="Finance">
            <FinanceWrapper>
              <FinanceButton
                title="Account receivable"
                value={23450.94}
                action={() => ({})}
              />
              <FinanceButton
                highlight
                chevronOrientation="right"
                title="Account receivable"
                value={23450.94}
                action={() => ({})}
              />
            </FinanceWrapper>
          </Card>
          <ClientContacts contacts={contacts} />
          <Card title="Geographical Location">
            {geoLocation && (
              <Map
                markers={renderMarker()}
                initialRegion={getInitialRegion()}
              />
            )}
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
