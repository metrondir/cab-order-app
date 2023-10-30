import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

function GoogleMapSection() {
  const containerStyle = {
    width: '100%',
    height: window.innerWidth * 0.5,
  };

  const { isLoaded } = useJsApiLoader({
    id: '6bc5b02e6889cd76',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  const [map, setMap] = React.useState(null);
  const [center, setCenter] = useState(null);
  const [myLocationMarker, setMyLocationMarker] = useState(null);

  useEffect(() => {
    // Get the user's location using the Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCenter(userLocation);

        // Set a closer initial zoom level (adjust the value as needed)
        const initialZoom = 15;

        if (map) {
          map.setCenter(userLocation);
          map.setZoom(initialZoom);

          // Create a marker for the user's location
          if (!myLocationMarker) {
            const marker = new window.google.maps.Marker({
              position: userLocation,
              map: map,
              title: 'My Location',
            });
            setMyLocationMarker(marker);
          }
        }
      });
    }
  }, [map]);

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);

    // Add event listener to disable Ctrl + scroll for zoom
    map.setOptions({
      gestureHandling: 'greedy',
		
    });
  }, []);

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center || { lat: -3.745, lng: -38.523 }} // Fallback to a default location if user location not available
      zoom={4}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        mapId: '6bc5b02e6889cd76',
		  
      }}
    >
      {myLocationMarker && <Marker position={myLocationMarker.getPosition()} />}
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : <></>;
}

export default GoogleMapSection;
