const dark = '#1d1d1f';
const lightGray = '#fafafa';

const size = {
  verySmall: 10,
  small: 11,
  regular: 12,
  medium: 14,
  large: 18,
  xl: 21,
  xxl: 25,
  xxx: 30,
};

const theme = {
  Header: {
    containerStyle: {
      backgroundColor: lightGray,
      paddingTop: 20,
      marginTop: -20,
    },
  },
  SearchBar: {
    containerStyle: {
      backgroundColor: lightGray,
    },
  },
  ListItem: {
    titleStyle: {
      fontSize: size.regular,
      color: dark,
    },
    subTitleStyle: {
      fontSize: size.verySmall,
    },
  },
  colors: {
    lightGray,
    primary: '#06c',
    itemSelected: '#C2D7ED',
    dark,
    darkGray: '#313131',
    orange: '#ef5602',
    error: '#FF6961',
    success: '#4BB543',
    white: '#ffffff',
  },
  font: {
    size,
  },
};

export default theme;
