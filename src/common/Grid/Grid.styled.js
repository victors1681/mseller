import styled from 'styled-components/native';

export const Grid = styled.View`
  display: flex;
`;

export const Row = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;

export const Column = styled.View`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
`;

export const DoubleColumn = styled.View`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;

  @media screen and (min-width: 700px) {
    flex: 2;
  }
`;

Grid.Row = Row;
Grid.Column = Column;
Grid.DoubleColumn = DoubleColumn;
