import React from 'react';
import styled from 'styled-components/native';

export const CardWrapper = styled.View`
  padding: 10px;
  display: flex;
  margin-bottom: 10px;
  flex-direction: column;
  background: ${({theme}) => theme.colors.white};
`;
export const CardTitle = styled.Text`
  font-size: ${({theme}) => theme.font.size.medium};
  color: ${({theme}) => theme.colors.header};
  padding-bottom: 5px;
  font-weight: bold;
`;

export const Card = ({title, children}) => {
  return (
    <CardWrapper>
      {title && <CardTitle>{title}</CardTitle>}
      {children}
    </CardWrapper>
  );
};

export default Card;
