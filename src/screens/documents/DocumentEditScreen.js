import React, {useState} from 'react';

import {
  SearchBar,
  Header,
  ListItem,
  Divider,
  Button,
} from 'react-native-elements';
import {ScrollView} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import LinearGradient from 'react-native-linear-gradient'; // Only if no expo
import Currency from '../../common/Currency';

import {
  Container,
  SaveIcon,
  ClientIcon,
  Footer,
  FooterTotalLabel,
  FooterTotalValue,
  AddIcon,
} from './DocumentEditScreen.styled';

const GET_CURRENT_DOCUMENT = gql`
  query localDocument {
    document @client {
      documentId
      date
      dueDate
      observations
      items {
        code
        name
        price
        quantity
        description
        tax {
          id
          name

          percentage
          description
        }
      }
    }
  }
`;

const DocumentEditScreen = ({navigation}) => {
  const {loading, error, data} = useQuery(GET_CURRENT_DOCUMENT);

  console.log('navigation', navigation);

  return (
    <Container>
      {/* <ScrollView /> */}
      <ListItem
        Component={TouchableScale}
        friction={90} //
        tension={100} // These props are passed to the parent component (here TouchableScale)
        activeScale={0.95} //
        title="Chris Jackson"
        titleStyle={{color: 'red', fontWeight: 'bold'}}
        subtitleStyle={{color: 'red'}}
        subtitle="Vice Chairman"
        chevron={{color: 'red'}}
      />
      <ListItem
        Component={TouchableScale}
        friction={90} //
        tension={100} // These props are passed to the parent component (here TouchableScale)
        activeScale={0.95} //
        leftAvatar={<ClientIcon />}
        title="Chris Jackson"
        titleStyle={{color: 'red', fontWeight: 'bold'}}
        subtitleStyle={{color: 'red'}}
        subtitle="Vice Chairman"
        chevron={{color: 'red'}}
        containerStyle={{margin: 10}}
        onPress={() => navigation.navigate('ClientSelector', {pickup: true})}
      />
      <Button
        type="clear"
        icon={<AddIcon />}
        title="Add Items"
        onPress={() => navigation.navigate('ProductSelector')}
      />
      <ScrollView>
        {data &&
          data.document.items.map((item, i) => (
            <ListItem
              onPress={() => console.log('pressed')}
              key={i}
              title={`${item.code} - ${item.description}`}
              subtitle={`${item.quantity} -`}
              rightSubtitle={<Currency value={item.price} />}
              bottomDividers
            />
          ))}
      </ScrollView>
      <Footer>
        <FooterTotalLabel>Total:</FooterTotalLabel>
        <FooterTotalValue value={10500.5} />
      </Footer>
    </Container>
  );
};

DocumentEditScreen.navigationOptions = ({navigation}) => {
  console.log('screenPropsscreenPropsscreenPropsscreenProps', navigation);
  return {
    title: 'Create Document',
    backTitle: '',
    headerRight: () => <SaveIcon onPress={() => alert('test')} />,
  };
};

export default DocumentEditScreen;
