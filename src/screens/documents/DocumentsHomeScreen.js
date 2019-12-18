import React, {useState} from 'react';
import {SearchBar, Header} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScrollView} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import {useIntl} from 'react-intl';
import Currency from '../../common/Currency';
import {Container, ListItem, AddIcon} from './DocumentScreen.styled';

const GET_DOCUMENTS = gql`
  query DOCUMENTS($clientName: String) {
    documents(clientName: $clientName) {
      documentId
      date
      dueDate
      observations
      annotation
      termsConditions
      documentType
      client {
        code
        name
      }
      currency {
        symbol
      }
      total
      totalPaid
      balance
      NCF
      status
      orderNumber
    }
  }
`;

const DocumentHomeScreen = () => {
  const [search, setSearch] = useState('');

  const {loading, error, data} = useQuery(GET_DOCUMENTS, {
    variables: {clientName: search},
  });

  const intl = useIntl();

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
        placeholder="Find document by client name"
        onChangeText={setSearch}
        value={search}
      />

      <ScrollView>
        {data &&
          data.documents.map((l, i) => (
            <ListItem
              rightSubtitle={<Currency value={l.total} />}
              onPress={() =>
                console.log('pressed', {clientCode: l.code, fromDocument: true})}
              key={i}
              title={`${l.client.code} - ${l.client.name}`}
              subtitle={`${intl.formatDate(l.date)}`}
              bottomDivider
            />
          ))}
      </ScrollView>
    </Container>
  );
};
DocumentHomeScreen.navigationOptions = ({navigation}) => ({
  title: 'Documents',
  headerRight: () => (
    <AddIcon onPress={() => navigation.navigate('DocumentEdit')} />
  ),
});

export default DocumentHomeScreen;
