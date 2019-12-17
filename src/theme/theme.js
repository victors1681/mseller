const dark = '#1d1d1f';
const lightGray = lightGray;

const size = {
  verySmall: 10,
  small: 11,
  regular: 12,
  medium: 14,
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
    dark,
    orange: '#ef5602',
    error: '#b00e23',
  },
  font: {
    size,
  },
};

export default theme;
