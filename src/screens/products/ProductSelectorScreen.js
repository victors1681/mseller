import React, {useState, useRef, useEffect} from 'react';
import {SearchBar, Header} from 'react-native-elements';
import {Text} from 'react-native';
import {useQuery, useMutation} from '@apollo/react-hooks';
import * as yup from 'yup';
import {Formik} from 'formik';
import Currency from '../../common/Currency';
import {
  KeyboardAvoidingView,
  ListItem,
  InputSelectionContainer,
  QuantityInput,
  AddItemButton,
  PriceInput,
  InputWrapper,
  ScrollView,
  ItemsCounter,
  CheckedIcon,
  CheckIconWrapper,
} from './ProductSelectorScreen.styled';
import PriceButtons from '../../components/PriceButtons';
import {GET_PRODUCTS, ADD_ITEM} from '../../graphql/productGraphql';

const ValidationSchema = yup.object().shape({
  quantity: yup
    .number()
    .required()
    .min(0.1)
    .positive(),
  price: yup
    .number()
    .min(0.1)
    .required()
    .positive(),
});

const createItem = ({code, name, description, tax}, quantity, price) => ({
  __typename: 'documentCreation',
  code,
  name,
  description,
  price: (price && parseFloat(price)) || 0,
  quantity: (quantity && parseFloat(quantity)) || 0,
  tax,
});

const ProductSelectorScreen = props => {
  console.log(props);

  const [search, setSearch] = useState('');
  const [itemSelected, setItemSelection] = useState(null);
  const [isInputSelectionActive, setInputSelection] = useState(false);

  const priceRef = useRef();
  const quantityRef = useRef();
  const searchRef = useRef();

  const {loading, error, data} = useQuery(GET_PRODUCTS, {
    variables: {description: search},
  });

  const [addItem, {data: addItemData}] = useMutation(ADD_ITEM);

  const handleItemSelected = (item, setFieldValue) => () => {
    setItemSelection(item);
    setInputSelection(true);
    quantityRef.current.focus();
    // Set default price to the input
    const generalPrice = item.price.find(
      f => f.name.toLowerCase() === 'general',
    );
    setFieldValue('price', generalPrice.price.toFixed(2).toString() || '');
  };

  const handleSearchOnFocus = () => setInputSelection(false);

  const handleAddItem = ({price, quantity}, {resetForm}) => {
    if (!itemSelected) {
      return;
    }
    const newItem = createItem(itemSelected, quantity, price);
    addItem({
      variables: {item: newItem},
    });
    resetForm();
    searchRef.current.focus();
    setInputSelection(false);
  };

  useEffect(() => {
    console.log('itemsTotal', addItemData);
    if (addItemData) {
      props.navigation.setParams({
        itemsTotal: addItemData ? addItemData.addItem.length : '0',
      });
    }
  }, [addItemData && addItemData.addItem.length]);

  const itemAdded = itemCode => {
    if (!data.document) {
      return null;
    }
    const getItemAdded = data.document.items.find(i => i.code === itemCode);

    if (getItemAdded) {
      return (
        <CheckIconWrapper>
          {getItemAdded.quantity} <CheckedIcon />
        </CheckIconWrapper>
      );
    }

    return null;
  };
  return (
    <Formik
      initialValues={{quantity: '1', price: ''}}
      onSubmit={handleAddItem}
      validationSchema={ValidationSchema}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
      }) => (
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30}>
          <SearchBar
            lightTheme
            round
            showCancel
            showLoading={loading}
            ref={searchRef}
            placeholder="Product..."
            onChangeText={setSearch}
            value={search}
            onFocus={handleSearchOnFocus}
          />
          <ScrollView keyboardDismissMode="on-drag">
            {data &&
              data.products.map((item, i) => (
                <ListItem
                  leftAvatar={{
                    source: {
                      uri:
                        'https://cdn.shopify.com/s/files/1/0108/9716/2321/products/AAA1516_1_1000x1000_crop_center@2x.jpg',
                    },
                  }}
                  rightTitle={itemAdded(item.code)}
                  rightSubtitle={
                    <Currency
                      value={
                        item.price.find(
                          f => f.name && f.name.toLowerCase() === 'general',
                        ).price
                      }
                    />
                  }
                  isSelected={item.code === (itemSelected && itemSelected.code)}
                  onPress={handleItemSelected(item, setFieldValue)}
                  key={i}
                  title={`${item.code} - ${item.description}`}
                  subtitle={`${item.code} -`}
                  bottomDivider
                />
              ))}
          </ScrollView>
          <InputSelectionContainer isActive={isInputSelectionActive}>
            <InputWrapper>
              <QuantityInput
                ref={quantityRef}
                onChangeText={handleChange('quantity')}
                onFocus={() => setFieldValue('quantity', '')}
                onBlur={() => {
                  handleBlur('quantity');
                  setFieldValue('quantity', '1');
                }}
                value={values.quantity}
                errorMessage={
                  errors.quantity && touched.quantity && errors.quantity
                }
              />
              <PriceInput
                ref={priceRef}
                onChangeText={handleChange('price')}
                onBlur={handleBlur('price')}
                value={values.price}
                errorMessage={errors.price && touched.price && errors.price}
              />
            </InputWrapper>
            <PriceButtons
              priceList={itemSelected && itemSelected.price}
              handleUpdatePriceInput={value => setFieldValue('price', value)}
            />
            <AddItemButton onPress={handleSubmit} loading={loading} />
          </InputSelectionContainer>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

ProductSelectorScreen.navigationOptions = ({navigation}) => ({
  title: 'Items Selection',
  headerRight: <ItemsCounter value={navigation.getParam('itemsTotal')} />,
});

export default ProductSelectorScreen;
