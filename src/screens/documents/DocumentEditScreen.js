import React, {useEffect} from 'react';
import {Button} from 'react-native-elements';
import {ActivityIndicator, Text} from 'react-native';
import {useQuery, useMutation} from '@apollo/react-hooks';
import TouchableScale from 'react-native-touchable-scale';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import Currency from '../../common/Currency';
import {GET_CURRENT_DOCUMENT} from '../../graphql/documentGraphql';
import {REMOVE_ITEM} from '../../graphql/productGraphql';
import {
  Container,
  SaveIcon,
  ClientIcon,
  Footer,
  FooterRow,
  FooterSubLabel,
  FooterSubValue,
  FooterTotalLabel,
  FooterTotalValue,
  AddIcon,
  DeleteIcon,
  TouchableItem,
  ActionWrapper,
  DocumentInfoItem,
  ClientInfoItem,
  CustomListItem,
  ObservationInput,
  ItemListFooterWrapper,
  AnnotationInput,
  KeyboardAvoidingView,
} from './DocumentEditScreen.styled';

const renderListItems = ({item}, rowMap) => {
  return (
    <CustomListItem
      onPress={() => console.log('pressed')}
      title={`${item.code} - ${item.description}`}
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
  const [removeItem, {data: removedItemData}] = useMutation(REMOVE_ITEM);

  console.log('DATAAA', data, error);
  if (!data) {
    return <ActivityIndicator />;
  }

  const {client, items, total, totalTax} = data && data.document;

  return (
    <KeyboardAvoidingView behavior="padding">
      <Container>
        <DocumentInfoItem
          Component={TouchableScale}
          title="No. 992-0992"
          subtitle="Order"
        />
        <ClientInfoItem
          Component={TouchableScale}
          leftAvatar={<ClientIcon />}
          title={
            client
              ? `${client && client.code} - ${client && client.name}`
              : 'Add client'
          }
          subtitle={client && client.identification}
          onPress={() =>
            navigation.navigate('ClientSelector', {pickupClient: true})}
        />
        <Button
          type="clear"
          icon={<AddIcon />}
          title="Add Items"
          onPress={() =>
            navigation.navigate('ProductSelector', {itemsTotal: items.length})}
        />

        <SwipeListView
          data={items}
          keyExtractor={item => item.code}
          renderItem={renderListItems}
          renderHiddenItem={({item}, rowMap) => (
            <ActionWrapper>
              <Text>Remove</Text>
              <TouchableItem
                onPress={() => {
                  removeItem({
                    variables: {itemId: item.code},
                  });
                }}>
                <DeleteIcon />
              </TouchableItem>
            </ActionWrapper>
          )}
          rightOpenValue={-75}
          ListFooterComponent={
            <ItemListFooterWrapper>
              <ObservationInput placeholder="Observations" />
              <AnnotationInput placeholder="Annotation (Internal no visible to the client)" />
            </ItemListFooterWrapper>
          }
        />

        <Footer>
          <FooterRow>
            <FooterSubLabel>Discount:</FooterSubLabel>
            <FooterSubValue value={(0).toString()} />
          </FooterRow>
          <FooterRow>
            <FooterSubLabel>Tax:</FooterSubLabel>
            <FooterSubValue value={totalTax && totalTax.toString()} />
          </FooterRow>
          <FooterRow>
            <FooterTotalLabel>Total:</FooterTotalLabel>
            <FooterTotalValue value={total && total.toString()} />
          </FooterRow>
        </Footer>
      </Container>
    </KeyboardAvoidingView>
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
