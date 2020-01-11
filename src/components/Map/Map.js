import React, {useState, useEffect} from 'react';
import MapView, {Marker, PROVIDER_GOOGLE, Circle} from 'react-native-maps';
import {Platform} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import head from 'lodash/head';
import get from 'lodash/get';
import {useGeolocation} from '../../hooks';

const Container = styled.View`
  height: 250px;
  background-color: red;
`;

const MapViewWrapper = styled(MapView)`
  height: 100%;
`;

const CurrentLocation = styled(Circle).attrs(({theme}) => ({
  strokeWidth: 2,
  strokeColor: theme.colors.dark,
  fillColor: theme.colors.primary,
}))``;

const Map = ({markers, initialRegion}) => {
  const [region, setRegion] = useState(initialRegion);

  const onRegionChange = () => {
    console.log('region changeddddddddd');
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
          // onMapReady={this._onMapReady}
          onRegionChangeComplete={onRegionChange}>
          {/* {coords && (
          <CurrentLocation
            center={{
              latitude: coords && coords.latitude,
              longitude: coords && coords.longitude,
            }}
            radius={200}
          />
        )} */}

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
