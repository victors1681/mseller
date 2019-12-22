import {LineChart as LC} from 'react-native-chart-kit';
import styled from 'styled-components/native';
import {Text, View, Dimensions, ActivityIndicator} from 'react-native';
import {Title} from '../../../common/common.styled';

const height = 220;
export const ActivityIndicatorCustom = styled(ActivityIndicator)`
  height: ${height}px;
`;
export const ChartTitle = styled(Title)`
  margin-left: 10px;
  margin-top: 5px;
`;
export const LineChart = styled(LC).attrs(({theme}) => ({
  width: Dimensions.get('window').width,
  height,
  bezier: true,
  yAxisLabel: '$',
  yAxisSuffix: 'k',
  chartConfig: {
    backgroundColor: theme.colors.white,
    backgroundGradientFrom: theme.colors.white,
    backgroundGradientTo: theme.colors.white,
    decimalPlaces: 2, // optional, defaults to 2dp
    propsForBackgroundLines: {
      strokeDasharray: '', // solid background lines with no dashes
      stroke: theme.colors.lightGray,
    },
    color: (opacity = 1) => theme.colors.primary,
    labelColor: (opacity = 1) => theme.colors.titleGray,
    style: {
      borderRadius: 16,
    },
  },
}))`
  margin-vertical: 8px;
  border-radius: 16px;
`;
