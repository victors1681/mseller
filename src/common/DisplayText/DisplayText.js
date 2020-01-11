import React from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex-direction: column;
  padding: 5px;
`;

const Label = styled.Text`
  font-size: ${({theme}) => theme.font.size.small};
  color: ${({theme}) => theme.colors.titleGray};
  font-weight: bold;
`;

const Value = styled.Text`
  font-size: ${({theme}) => theme.font.size.medium};
  color: ${({theme}) => theme.colors.dark};
  text-transform: ${({capitalize}) => (capitalize ? 'capitalize' : 'none')};
`;

const DisplayText = ({label = '', value = '', capitalize = true}) => (
  <Wrapper>
    <Label>{label}</Label>
    <Value capitalize={capitalize}>{value === '' ? '-' : value}</Value>
  </Wrapper>
);

export default DisplayText;
