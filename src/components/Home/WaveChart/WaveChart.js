import React from 'react';
import {Text, View} from 'react-native';
import {
  LineChart,
  ChartTitle,
  ActivityIndicatorCustom,
} from './WaveChart.styled';

const WaveChart = ({title, data}) => {
  return (
    <View>
      <ChartTitle>{title}</ChartTitle>
      {!data && <ActivityIndicatorCustom />}
      {data && <LineChart data={data} />}
    </View>
  );
};

export default WaveChart;
