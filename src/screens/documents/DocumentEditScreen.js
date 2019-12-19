import React, {useEffect} from 'react';
import {
  SearchBar,
  Header,
  ListItem,
  Divider,
  Button,
} from 'react-native-elements';
import {ScrollView, ActivityIndicator} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import LinearGradient from 'react-native-linear-gradient'; // Only if no expo
import Currency from '../../common/Currency';
import {GET_CURRENT_DOCUMENT} from '../../graphql/documentGraphql';
import {
  Container,
  SaveIcon,
  ClientIcon,
  Footer,
  FooterTotalLabel,
  FooterTotalValue,
  AddIcon,
} from './DocumentEditScreen.styled';

const DocumentEditScreen = ({navigation}) => {
  const {loading, error, data} = useQuery(GET_CURRENT_DOCUMENT);
  console.log('DATAAA', data, error);
  if (!data) {
    return <ActivityIndicator />;
  }
  console.log('navigation', navigation);

  const {client, items} = data && data.document;

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
        title={`${client.code} - ${client.name}`}
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
        {items.map((item, i) => (
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
  return {
    title: 'Create Document',
    backTitle: '',
    headerRight: () => <SaveIcon onPress={() => alert('test')} />,
  };
};

export default DocumentEditScreen;
