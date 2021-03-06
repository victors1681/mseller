import styled from 'styled-components/native';
import {
  ListItem as ListItemNative,
  Input,
  Button,
  Badge,
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  KeyboardAvoidingView as KAV,
  ScrollView as ScrollViewNative,
  Platform,
} from 'react-native';

export const KeyboardAvoidingView = styled(KAV).attrs({
  keyboardVerticalOffset: Platform.OS === 'ios' ? 30 : 0,
  behavior: Platform.OS === 'ios' ? 'padding' : null,
})`
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

const getContainerHight = isActive => {
  if (isActive) {
    return Platform.OS === 'ios' ? 216 : 160;
  }
  return 0;
};
export const InputSelectionContainer = styled.View`
  height: ${({isActive}) => getContainerHight(isActive)};
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
  containerStyle: {
    margin: 10,
    marginTop: 5,
  },
})``;

export const ItemsCounter = styled(Badge).attrs(({theme}) => ({
  status: 'primary',
  containerStyle: {marginRight: 5},
  textStyle: {fontSize: theme.font.size.verySmall},
}))``;

export const CheckedIcon = styled(Icon).attrs(({theme}) => ({
  name: 'check-circle',
  size: 13,
  color: theme.colors.success,
}))``;

export const CheckIconWrapper = styled.Text`
  flex-direction: column;
  font-size: ${({theme}) => theme.font.size.small};
`;
