// MapContainer.jsx
import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap } from '@react-google-maps/api';
function MapContainer({ children, center }) {
  const [map, setMap] = useState(null);
  const containerStyle = {
    width: '100%',
    height: '76vh',
  };

  const onLoad = useCallback(function callback(map) {
    if (center && !isNaN(center.lat) && !isNaN(center.lng)) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(center);
      map.fitBounds(bounds);
      setMap(map);
      map.setOptions({ gestureHandling: 'greedy' });
    }
  }, [center]);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  useEffect(() => {
    if (map && center && !isNaN(center.lat) && !isNaN(center.lng)) {
      map.setCenter(center);
    }
  }, [map, center]);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center || { lat: -3.745, lng: -38.523 }} 
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{mapId:'4113717585f11867'}}
    >
      {children}
    </GoogleMap>
  );
}

export default MapContainer;