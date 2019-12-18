import React, {useState} from 'react';
import {ButtonGroup} from 'react-native-elements';
import styled from 'styled-components';
import Currency from '../../common/Currency';

const PriceBtn = styled(Currency)`
  color: ${({isSelected, theme}) =>
    isSelected ? theme.colors.white : theme.colors.dark};
`;

const PriceButtons = ({priceList, handleUpdatePriceInput}) => {
  const [selectedIndex, setIndex] = useState(0);
  // const buttons = ['Hello', 'World', 'Buttons'];
  const buttons =
    (priceList &&
      priceList.map(
        (price, index) =>
          (
            <PriceBtn
              value={price.price}
              isSelected={selectedIndex === index}
            />
          ) || '',
      )) ||
    [];

  const handleButton = index => {
    setIndex(index);
    console.log('selected', priceList[index]);
    handleUpdatePriceInput(priceList[index].price);
  };
  return (
    <ButtonGroup
      onPress={handleButton}
      selectedIndex={selectedIndex}
      buttons={buttons}
      containerStyle={{height: 40}}
    />
  );
};

export default PriceButtons;
