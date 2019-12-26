import React, {useState} from 'react';
import {useMutation} from '@apollo/react-hooks';
import ImagePicker from 'react-native-image-picker';
import {ReactNativeFile} from 'apollo-upload-client';

// More info on all the options is below in the API Reference... just some common use cases shown here
const options = {
  title: 'Select Avatar',
  quality: 0.2,
  storageOptions: {
    skipBackup: false,
    path: 'images',
  },
};

/**
 * The first arg is the options object for customization (it can also be null or omitted for default options),
 * The second arg is the callback which sends object: response (more info in the API Reference)
 */

export const useImagePicker = handleImageCallback => {
  const openImagePicker = () => {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // const source = { uri: response.uri };
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        const file = new ReactNativeFile({
          uri: response.uri,
          name: response.fileName,
          type: response.type,
        });
        console.log('Response = ', response);
        console.log('Response = ', file);

        handleImageCallback(file);
      }
    });
  };

  return {
    openImagePicker,
  };
};
