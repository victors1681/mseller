import styled from 'styled-components';
import Currency from './Currency';

export const Title = styled.Text`
  margin-bottom: 4px;
  color: ${({theme}) => theme.colors.dark};
  font-size: ${({theme}) => theme.font.size.small};
  letter-spacing: 2px;
  justify-content: flex-start;
  font-weight: bold;
`;
