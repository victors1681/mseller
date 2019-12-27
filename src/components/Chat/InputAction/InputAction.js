import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';
import {ActivityIndicator} from 'react-native';
import {Overlay, Button, Image} from 'react-native-elements';
import {useMutation} from '@apollo/react-hooks';
import {useImagePicker} from '../../../hooks/useImagePicker';
import {UPLOAD_MESSAGE_CONTENT} from '../../../graphql/messagesGraphql';

const ActionWrapper = styled.View`
  flex-direction: row;
  padding: 5px;
`;

const CustomOverlay = styled(Overlay).attrs({
  width: 'auto',
  height: 'auto',
})``;

const ImageIcon = styled(Icon).attrs(({theme}) => ({
  name: 'camera',
  size: 25,

  color: theme.colors.darkGray,
}))``;

const OptionContainer = styled.View`
  flex-direction: row;
`;

const Caption = styled.Text``;

const ActionButton = styled(Button).attrs({
  containerStyle: {
    width: 'auto',
  },
})`
  padding: 10px;
`;

const OverlayWrapper = styled.View``;
const Preview = styled(Image).attrs(({theme}) => ({}))`
  width: 270px;
  height: 280px;
`;
const InputAction = ({chatId, contentCallback}) => {
  const [imageData, setImageData] = useState(null);

  const [previewImage, setPreviewImage] = useState(null);

  const [uploadMessageContent, {data, error, loading}] = useMutation(
    UPLOAD_MESSAGE_CONTENT,
  );

  useEffect(() => {
    if (data && data.uploadMessageContent) {
      contentCallback(data.uploadMessageContent);
      setImageData(null);
    }
  }, [data]);

  const handleImageCallback = (contentData, response) => {
    console.log('push');
    setImageData(contentData);
    setPreviewImage(response.uri);
  };

  const {openImagePicker} = useImagePicker(handleImageCallback);

  const handleSendImage = () => {
    uploadMessageContent({
      variables: {
        file: imageData,
      },
    });
  };

  console.log('previewImagepreviewImage', imageData);

  return (
    <ActionWrapper>
      <CustomOverlay isVisible={!!imageData}>
        <OverlayWrapper>
          {previewImage && (
            <Preview
              source={{
                uri: previewImage,
              }}
              PlaceholderContent={<ActivityIndicator />}
            />
          )}

          <Caption>Hello from Overlay!</Caption>
          <OptionContainer>
            <ActionButton
              title="Cancel"
              type="outline"
              onPress={() => setImageData(null)}
            />
            <ActionButton title="Send Image" solid onPress={handleSendImage} />
          </OptionContainer>
        </OverlayWrapper>
      </CustomOverlay>
      <ImageIcon onPress={openImagePicker} />
    </ActionWrapper>
  );
};

export default InputAction;
