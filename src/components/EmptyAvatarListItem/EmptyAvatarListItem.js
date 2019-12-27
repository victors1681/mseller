import React from 'react';
import styled from 'styled-components/native';
import head from 'lodash/head';
import randomColor from 'randomcolor';

const AvatarContainer = styled.View`
  width: 40px;
  height: 40px;
  background-color: ${({color}) => color};
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;

const AvatarText = styled.Text`
  color: white;
  font-size: ${({theme}) => theme.font.size.large};
`;

const EmptyAvatarListItem = ({firstName, lastName, defaultColor}) => {
  const initals = `${head(firstName, '')}.${head(lastName, '')}`;
  const color = defaultColor || randomColor();
  return (
    <AvatarContainer color={color}>
      <AvatarText>{initals}</AvatarText>
    </AvatarContainer>
  );
};

export default EmptyAvatarListItem;
