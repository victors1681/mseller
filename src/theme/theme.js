const dark = '#1d1d1f';
const lightGray = '#EFF2F5';

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
  Divider: {
    style: {
      backgroundColor: lightGray,
    },
  },
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
    titleGray: '#C0C0C0',
    header: '#6D7278',
    primary: '#0055B3',
    secondary: '#0C0B2A',
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
