// UserLocation.jsx
import React, { useEffect } from 'react';

function UserLocation({ setCenter }) {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  return null;
}

export default UserLocation;