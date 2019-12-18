import React, {useState, useRef, useEffect} from 'react';
import {SearchBar, Header} from 'react-native-elements';
import {View} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import * as yup from 'yup';
import Currency from '../../common/Currency';
import {
  Container,
  KeyboardAvoidingView,
  ListItem,
  InputSelectionContainer,
  QuantityInput,
  AddItemButton,
  PriceInput,
  InputWrapper,
  ScrollView,
} from './ProductSelectorScreen.styled';
import PriceButtons from '../../components/PriceButtons';
import {GET_PRODUCTS} from './graphql/productQuery';

const schema = yup.object().shape({
  quantity: yup
    .number()
    .required()
    .positive(),
  priceSelected: yup
    .number()
    .required()
    .positive(),
});

const ProductSelectorScreen = () => {
  const [search, setSearch] = useState('');
  const [itemSelected, setItemSelection] = useState(null);
  const [priceSelected, setPriceSelected] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [isInputSelectionActive, setInputSelection] = useState(false);

  const priceRef = useRef();
  const quantityRef = useRef();

  const {loading, error, data} = useQuery(GET_PRODUCTS, {
    variables: {description: search},
  });

  console.log('error', data);

  const handleItemSelect = item => () => {
    setItemSelection(item);
    quantityRef.current.focus();
    // Set default price to the input
    item.price.map(
      p =>
        p.name &&
        p.name.toLowerCase() === 'general' &&
        setPriceSelected((p.price && p.price.toFixed(2).toString()) || ''),
    );
  };

  /**
   * handle default value if is empty
   */
  const handleQuantityOnBlur = () => !quantity && setQuantity('1');

  const handleUpdatePriceInput = price => {
    console.log('price updating input', price);
    setPriceSelected(`${price}`);
  };

  const handleSearchOnFocus = () => setInputSelection(false);
  const handleSearchOnBlur = () => setInputSelection(true);
  const handleAddItem = () => {
    schema
      .isValid({
        quantity,
        priceSelected,
      })
      .then(function(valid) {
        console.log('isValid', valid);
      });
  };

  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={30}>
      <SearchBar
        lightTheme
        round
        showCancel
        showLoading={loading}
        // onRefresh={refetch}
        placeholder="Product..."
        onChangeText={setSearch}
        value={search}
        onFocus={handleSearchOnFocus}
        onBlur={handleSearchOnBlur}
      />

      <ScrollView>
        {data &&
          data.products.map((item, i) => (
            <ListItem
              rightSubtitle={
                <Currency
                  value={item.price.find(f => f.name === 'General').price}
                />
              }
              isSelected={item.code === (itemSelected && itemSelected.code)}
              onPress={handleItemSelect(item)}
              key={i}
              title={`${item.code} - ${item.description}`}
              subtitle={`${item.code} -`}
              bottomDivider
            />
          ))}
      </ScrollView>
      {isInputSelectionActive && (
        <InputSelectionContainer>
          <InputWrapper>
            <QuantityInput
              ref={quantityRef}
              value={quantity}
              onChangeText={value => setQuantity(value)}
              onFocus={() => setQuantity('')}
              onBlur={handleQuantityOnBlur}
            />
            <PriceInput
              ref={priceRef}
              value={priceSelected}
              onChangeText={value => setPriceSelected(value)}
            />
          </InputWrapper>
          <PriceButtons
            priceList={itemSelected && itemSelected.price}
            handleUpdatePriceInput={handleUpdatePriceInput}
          />
          <AddItemButton onPress={handleAddItem} />
        </InputSelectionContainer>
      )}
    </KeyboardAvoidingView>
  );
};

ProductSelectorScreen.navigationOptions = {
  title: 'Items Selection',
};

export default ProductSelectorScreen;
