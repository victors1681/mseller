import styled from 'styled-components/native';
import {ListItem as ListItemNative, Input, Button} from 'react-native-elements';
import {
  KeyboardAvoidingView as KAV,
  ScrollView as ScrollViewNative,
} from 'react-native';

export const KeyboardAvoidingView = styled(KAV)`
  flex: 1;
`;
export const Container = styled.View`
  flex: 1;
`;

export const ScrollView = styled(ScrollViewNative)`
  flex: 3;
`;

const subTitleStyle = theme => ({
  fontSize: theme.font.verySmall,
  color: theme.colors.grey3,
});

export const ListItem = styled(ListItemNative).attrs(({isSelected, theme}) => ({
  subtitleStyle: subTitleStyle(theme),
  containerStyle: {
    backgroundColor: isSelected
      ? theme.colors.itemSelected
      : theme.colors.white,
  },
}))``;

export const InputSelectionContainer = styled.View`
  height: ${({isActive}) => (isActive ? 216 : 0)};
  opacity: ${({isActive}) => (isActive ? 1 : 0)};
  padding-top: 9px;
`;

export const InputWrapper = styled.View`
  flex-direction: row;
`;
export const QuantityInput = styled(Input).attrs({
  inputContainerStyle: {
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 6,
  },
  containerStyle: {
    width: 80,
    flex: 1,
  },
  autoCompleteType: 'off',
  autoCorrect: false,
  defaultValue: '1',
  keyboardType: 'numeric',
})`
  flex: 1;
`;
export const PriceInput = styled(Input).attrs({
  inputContainerStyle: {
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 6,
  },
  containerStyle: {
    width: 80,
    flex: 1,
  },
  autoCompleteType: 'off',
  autoCorrect: false,
  placeholder: 'price',
  keyboardType: 'numeric',
})`
  flex: 1;
`;

export const AddItemButton = styled(Button).attrs({
  title: 'Add Item',
})`
  margin: 10px;
  margin-top: 5px;
`;
