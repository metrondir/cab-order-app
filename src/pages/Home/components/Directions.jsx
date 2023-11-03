// Directions.jsx
import React, { useEffect, useState } from 'react';
import { DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

function Directions({ map, source, destination }) {
  const [directions, setDirections] = useState(null);
	
  useEffect(() => {
    if (source && destination && typeof source.lat === 'number' && typeof source.lng === 'number' && typeof destination.lat === 'number' && typeof destination.lng === 'number') {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: { lat: source.lat, lng: source.lng },
          destination: { lat: destination.lat, lng: destination.lng },
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  }, [source, destination]);
        

return directions && (
	<DirectionsRenderer
		directions={directions}
		options={{
			polylineOptions: {
				strokeColor: '#000',
				strokeWeight: 4,
			},
			suppressMarkers: true
		}}
	/>
);
}

export default Directions;