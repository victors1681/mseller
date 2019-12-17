import React, {useState} from 'react';
import {SearchBar, Header} from 'react-native-elements';
import {ScrollView} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Currency from '../../common/Currency';
import {Container, ListItem} from './ProductScreen.styled';

const GET_PRODUCTS = gql`
  query PRODUCTS($description: String) {
    products(description: $description, limit: 10) {
      code
      name
      description
      price {
        name
        price
      }
    }
  }
`;

const ProductScreen = () => {
  const [search, setSearch] = useState('');

  const {loading, error, data} = useQuery(GET_PRODUCTS, {
    variables: {description: search},
  });

  console.log('error', error);

  return (
    <Container>
      <Header
        leftComponent={{icon: 'menu'}}
        centerComponent={{text: 'Products'}}
        rightComponent={{icon: 'home'}}
      />
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

export default ProductScreen;
