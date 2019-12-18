import React, {useState} from 'react';
import {SearchBar, Header} from 'react-native-elements';
import {ScrollView} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Currency from '../../common/Currency';
import {Container, ListItem} from './ProductScreen.styled';
import {GET_PRODUCTS} from './graphql/productQuery';

const ProductScreen = () => {
  const [search, setSearch] = useState('');

  const {loading, error, data} = useQuery(GET_PRODUCTS, {
    variables: {description: search},
  });

  console.log('error', data);

  return (
    <Container>
      {/* <Header
        leftComponent={{icon: 'menu'}}
        centerComponent={{text: 'Products'}}
        rightComponent={{icon: 'home'}}
      /> */}
      <SearchBar
        lightTheme
        round
        showCancel
        showLoading={loading}
        // onRefresh={refetch}
        placeholder="Product..."
        onChangeText={setSearch}
        value={search}
      />

      <ScrollView>
        {data &&
          data.products.map((l, i) => (
            <ListItem
              rightSubtitle={
                <Currency
                  value={l.price.find(f => f.name === 'General').price}
                />
              }
              onPress={() => console.log('pressed')}
              key={i}
              title={`${l.code} - ${l.description}`}
              subtitle={`${l.code} -`}
              bottomDivider
            />
          ))}
      </ScrollView>
    </Container>
  );
};

ProductScreen.navigationOptions = {
  title: 'Products',
};

export default ProductScreen;
