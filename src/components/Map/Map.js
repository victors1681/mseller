import React, {useState} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import styled from 'styled-components/native';

const Container = styled.View`
  height: 250px;
  background-color: red;
`;
const Map = () => {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.09,
    longitudeDelta: 0.035,
  });
  const [markers, setMarkers] = useState([
    {
      title: 'CLIENTE',
      description: 'My descr',
      latlng: {latitude: 37.8025259, longitude: -122.4351431},
    },
  ]);

  const onRegionChange = () => {};

  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  return (
    <Container>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{
          height: '100%',
        }}
        initialRegion={initialRegion}
        region={region}
        onRegionChange={onRegionChange}>
        {markers.map((marker, i) => (
          <Marker
            key={i}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
    </Container>
  );
};

export default Map;
