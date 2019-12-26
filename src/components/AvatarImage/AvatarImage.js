import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {useMutation} from '@apollo/react-hooks';
import {ProfileAvatar} from './AvatarImage.styled';
import {useImagePicker} from '../../hooks/useImagePicker';
import {useUserInfo} from '../../hooks/useUserInfo';
import {UPDATE_USER_AVATAR} from '../../graphql/userGraphql';

const AvatarImage = () => {
  const {userId, getInitials, userInfo} = useUserInfo();
  const [avatarUrl, setAvatarUrl] = useState(userInfo.avatar || '');
  const [updateUserAvatar, {data, error, loading}] = useMutation(
    UPDATE_USER_AVATAR,
  );

  useEffect(() => {
    if (data && data.uploadUserAvatar) {
      setAvatarUrl(data.uploadUserAvatar);
    }
  }, [data && data.uploadUserAvatar]);
  console.log('sss', data, avatarUrl);

  const handleImageCallback = imageData => {
    updateUserAvatar({
      variables: {
        file: imageData,
        userId,
      },
    });
  };

  const {openImagePicker} = useImagePicker(handleImageCallback);

  return loading ? (
    <ActivityIndicator />
  ) : (
    <ProfileAvatar
      source={{
        uri: avatarUrl,
      }}
      title={getInitials()}
      imageComponent={loading ? <ActivityIndicator /> : null}
      onPress={openImagePicker}
    />
  );
};

export default AvatarImage;
