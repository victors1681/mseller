import React, {useEffect} from 'react';
import {Button} from 'react-native-elements';
import {Alert, Text} from 'react-native';
import {useQuery, useMutation, useLazyQuery} from '@apollo/react-hooks';
import TouchableScale from 'react-native-touchable-scale';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import isEmpty from 'lodash/isEmpty';
import Currency from '../../common/Currency';
import {
  GET_CURRENT_DOCUMENT,
  ADD_DOCUMENT,
  RESET_CURRENT_DOCUMENT,
  GET_DOCUMENT_SEQUENCE,
} from '../../graphql';
import {REMOVE_ITEM} from '../../graphql/productGraphql';
import {InfoItem, Footer} from '../../components/Document';
import Loading from '../../components/Loading';
import {
  Container,
  SaveIcon,
  ClientIcon,
  TotalSummary,
  FooterRow,
  FooterSubLabel,
  FooterSubValue,
  FooterTotalLabel,
  FooterTotalValue,
  AddIcon,
  DeleteIcon,
  TouchableItem,
  ActionWrapper,
  ClientInfoItem,
  CustomListItem,
  KeyboardAvoidingView,
} from './DocumentEditScreen.styled';
import {useMain} from '../../hooks';

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
  const {showErrors} = useMain();
  const {loading, error, data} = useQuery(GET_CURRENT_DOCUMENT);
  const [removeItem] = useMutation(REMOVE_ITEM);

  const [
    addDocument,
    {data: documentResponse, error: errorSaving, loading: loadingSave},
  ] = useMutation(ADD_DOCUMENT);

  const [
    fetchNewSequence,
    {data: sequenceData, sequenceLoading},
  ] = useLazyQuery(GET_DOCUMENT_SEQUENCE, {
    variables: {
      sellerCode: '24',
      documentType: 'invoice',
    },
    fetchPolicy: 'network-only',
  });

  const [resetDocument] = useMutation(RESET_CURRENT_DOCUMENT);
  useEffect(() => {
    if (documentResponse && !errorSaving) {
      // document saved.
      resetDocument();
      fetchNewSequence();
    }
  }, [documentResponse, errorSaving]);
  console.log('DATAAA', data, error);

  if (!data || loading) {
    return <Loading />;
  }

  // console.log('errorSavingerrorSaving', errorSaving);

  const handleSaveValidation = () => {
    // handle validations
    if (!data.document.client) {
      validationErrors.push('No client Selected');
    }
    // client validation
    if (isEmpty(data.document.items)) {
      validationErrors.push('Need to add a product');
    }

    if (!isEmpty(validationErrors)) {
      showErrors({error: validationErrors});
    }
    // a least one product

    // document
    const documentCloned = {...data.document};

    delete documentCloned.__typename;
    delete documentCloned.client.__typename;
    delete documentCloned.currency.__typename;
    delete documentCloned.seller.__typename;
    delete documentCloned.priceList.__typename;

    for (let x = 0; x < documentCloned.items.length; x++) {
      delete documentCloned.items[x].__typename;
      for (let y = 0; y < documentCloned.items[x].tax.length; y++) {
        delete documentCloned.items[x].tax[y].__typename;
      }
    }
    // delete documentCloned.item.__typename;

    addDocument({
      variables: {
        document: documentCloned,
      },
    });
  };

  const confirmSaveDocument = () => {
    Alert.alert(
      `${data && data.document.documentType}`,
      'Actions for this document',
      [
        {
          text: 'Save - Ready to Process',
          onPress: () => handleSaveValidation(),
        },
        {
          text: 'Save & hold for later',
          onPress: () => console.log('Cancel Pressed'),
        },
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => console.log('OK Pressed'),
        },
      ],
      {cancelable: true},
    );
  };

  useEffect(() => {
    navigation.setParams({confirmSaveDocument});
  }, [data && data.document]);

  const {client, items, total, totalTax} = data && data.document;

  return (
    <KeyboardAvoidingView behavior="padding">
      <Container>
        {loadingSave && <Loading />}
        <InfoItem
          sequenceData={sequenceData}
          loading={sequenceLoading}
          fetchNewSequence={fetchNewSequence}
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
          ListFooterComponent={<Footer />}
        />

        <TotalSummary>
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
        </TotalSummary>
      </Container>
    </KeyboardAvoidingView>
  );
};

DocumentEditScreen.navigationOptions = ({navigation}) => {
  return {
    title: 'Create Document',
    backTitle: '',
    headerRight: () => (
      <SaveIcon onPress={() => navigation.getParam('confirmSaveDocument')()} />
    ),
  };
};

export default DocumentEditScreen;
