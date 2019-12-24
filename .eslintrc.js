module.exports = {
    root: true,
    "env": {
       "node": true,
       "es6": true,
       "react-native/react-native": true
    },
    "globals": {
       "Atomics": "readonly",
       "SharedArrayBuffer": "readonly"
    },
    "parser": "babel-eslint",
    "settings": {
       "react": {
          "version": "16.8"
       },
       "import/resolver": {
          "node": {
             "paths": [
                "src"
             ],
             "extensions": [
                ".js",
                ".jsx",
                ".ts",
                ".tsx"
             ]
          }
       }
    },
    "plugins": ["react"],
    "extends": [
       "airbnb",
       "eslint:recommended",
       "plugin:prettier/recommended",
       "plugin:react/recommended",
       "plugin:react-native/all"
    ],
    "rules": {
       "max-len":["error", 200],
       "react/jsx-filename-extension": "off",
       "import/no-named-as-default": "off",
       "import/no-named-as-default-member": "off",
       "react/destructuring-assignment": "off",
       "react/prop-types": "off",
       "react/jsx-one-expression-per-line": "off",
       "no-console": "off",
       "import/no-unresolved": "off",
       "jsx-a11y/anchor-is-valid": "off",
       "react/jsx-wrap-multilines": "off",
       "react/display-name": "off",
       "react/style-prop-object": "off",
       "no-use-before-define": "off",
       "global-require": "off",
       "import/prefer-default-export": "off",
       "react/jsx-props-no-spreading": "off",
       "react-native/no-color-literals": "off",
       "react/jsx-uses-react": "error",   
       "react/jsx-uses-vars": "error", 
       "react-native/no-raw-text": "off",
       "react/jsx-closing-bracket-location": "off",
       "react/no-array-index-key": "off",
       "no-underscore-dangle": "off"
    }
  
};
