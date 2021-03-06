import React, {useState, useEffect} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {Platform} from 'react-native';
import styled from 'styled-components/native';
import {useGeolocation} from '../../hooks';

const Container = styled.View`
  height: 250px;
`;

const MapViewWrapper = styled(MapView)`
  height: 100%;
`;

const Map = ({markers, initialRegion}) => {
  const [region, setRegion] = useState(initialRegion);

  const onRegionChange = () => {
    console.log('region changed');
  };

  const {getCurrentPosition, coords} = useGeolocation();

  useEffect(() => {
    getCurrentPosition();
  }, []);

  useEffect(() => {
    if (coords && !initialRegion) {
      setRegion({
        ...region,
        longitude: coords.longitude,
        latitude: coords.latitude,
      });
    }
  }, [coords && coords.latitude]);

  return (
    <Container>
      {region && (
        <MapViewWrapper
          provider={PROVIDER_GOOGLE}
          initialRegion={initialRegion}
          region={region}
          loadingEnabled
          showsUserLocation
          showsMyLocationButton={Platform.OS === 'ios'}
          onRegionChange={onRegionChange}
          onRegionChangeComplete={onRegionChange}>
          {markers &&
            markers.map((marker, i) => (
              <Marker
                key={i}
                coordinate={marker.coords}
                title={marker.title}
                description={marker.description}
              />
            ))}
        </MapViewWrapper>
      )}
    </Container>
  );
};

export default Map;
