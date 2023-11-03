import React from 'react';
import { Marker } from '@react-google-maps/api';

function MapMarker({ position, icon }) {
  if (!position || typeof position.lat !== 'number' || typeof position.lng !== 'number') {
    console.error('Invalid position:', position);
    return null;
  }

  return (
    <Marker
      position={position}
      icon={{
        url: '/location-dot-solid.svg',
        scaledSize: new window.google.maps.Size(30, 30)
      }}
    />
  );
}

export default MapMarker;