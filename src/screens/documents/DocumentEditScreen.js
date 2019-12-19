import React, {useEffect} from 'react';
import {
  SearchBar,
  Header,
  ListItem,
  Divider,
  Button,
} from 'react-native-elements';
import {
  ScrollView,
  ActivityIndicator,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import LinearGradient from 'react-native-linear-gradient'; // Only if no expo
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
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
  DeleteIcon,
  TouchableItem,
  ActionWrapper,
} from './DocumentEditScreen.styled';

const renderListItems = ({item}, rowMap) => {
  console.log('rowMap', item);
  return (
    <ListItem
      onPress={() => console.log('pressed')}
      title={`${item.code} - ${item.description}`}
      subtitle={`${item.quantity} -`}
      rightTitle={
        <Currency value={item.price} suffix={`${item.quantity} x `} />
      }
      rightSubtitle={<Currency value={item.quantity * item.price} />}
      bottomDividers
    />
  );
};

const DocumentEditScreen = ({navigation}) => {
  const {loading, error, data, refetch} = useQuery(GET_CURRENT_DOCUMENT);
  console.log('DATAAA', data, error);
  if (!data) {
    return <ActivityIndicator />;
  }

  const {client, items, total} = data && data.document;

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
        onPress={() =>
          navigation.navigate('ProductSelector', {itemsTotal: items.length})}
      />

      <SwipeListView
        closeOnScroll
        disableRightSwipe
        closeOnRowOpen
        closeOnRowBeginSwipe
        data={items}
        keyExtractor={item => item.code}
        renderItem={renderListItems}
        renderHiddenItem={(data, rowMap) => (
          <ActionWrapper>
            <Text>Remove</Text>
            <TouchableItem
              onPress={() => this.deleteRow(rowMap, data.item.key)}>
              <DeleteIcon />
            </TouchableItem>
          </ActionWrapper>
        )}
        rightOpenValue={-75}
      />
      {/* 
        {items.map((item, i) => (
          <ListItem
            onPress={() => console.log('pressed')}
            key={i}
            title={`${item.code} - ${item.description}`}
            subtitle={`${item.quantity} -`}
            rightTitle={
              <Currency value={item.price} suffix={`${item.quantity} x `} />
            }
            rightSubtitle={<Currency value={item.quantity * item.price} />}
            bottomDividers
          />
        ))} */}

      <Footer>
        <FooterTotalLabel>Total:</FooterTotalLabel>
        <FooterTotalValue value={total && total.toString()} />
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
