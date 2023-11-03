//import React, { useEffect, useState , useContext} from 'react';
//import { GoogleMap,  MarkerF, OverlayViewF, DirectionsRenderer } from '@react-google-maps/api';
//import { SourceContext } from '../../Context/SourceContext';
//import { DestinationContext } from '../../Context/DestinationContext';
//import './Home.css'

//function GoogleMapSection() {
//  const containerStyle = {
//    width: '100%',
//    height: window.innerWidth * 0.35,
//  };
//  const google = window.google
//	const{source,setSource}=useContext(SourceContext);
//	const{destination,setDestination}=useContext(DestinationContext);
//  const [directionRoutePoints,setDirectionRoutePoints]=useState();
//  const [map, setMap] = React.useState(null);
//  const [center, setCenter] = useState();
//  useEffect(() => {
//     Get the user's location using the Geolocation API
//    if (navigator.geolocation) {
//      navigator.geolocation.getCurrentPosition((position) => {
//        const userLocation = {
//          lat: position.coords.latitude,
//          lng: position.coords.longitude,
//        };
//        setCenter(userLocation);
//        const initialZoom = 16;
//        if (map) {
//          map.setCenter(userLocation);
//          map.setZoom(initialZoom);
//        }
//      });
//    }
//  }, [map]);

//  useEffect(()=>{
//    if(source?.length!=[]&&map)
//    {
//      map.panTo({
//        lat:source.lat,
//        lng:source.lng
//      })
//      setCenter({
//        lat:source.lat,
//        lng:source.lng
//      })
//    }
//    if(source.length!=[]&&destination.length!=[]){
//      directionRoute();
//  }
//  },[source])

//  useEffect(()=>{
//    if(destination?.length!=[]&&map)
//    {
//      setCenter({
//        lat:destination.lat,
//        lng:destination.lng
//      })
//    }
//    if(source.length!=[]&&destination.length!=[]){
//        directionRoute();
//    }
//  },[destination])
//  const directionRoute = () => {
//    const DirectionsService = new google.maps.DirectionsService();
  
//    DirectionsService.route({
//      destination: { lat: destination.lat, lng: destination.lng },
//      origin: { lat: source.lat, lng: source.lng },
//      travelMode: google.maps.TravelMode.DRIVING,
//    }, (result, status) => {
//      if (status === google.maps.DirectionsStatus.OK) {
//        setDirectionRoutePoints(result);
       
//      } else if (status === google.maps.DirectionsStatus.ZERO_RESULTS) {
//        console.error('No driving directions available for this route.');
//      } else {
//        console.error('Error:', status);
//      } 
//    });
//  };
//  const onLoad = React.useCallback(function callback(map) {
//    const bounds = new google.maps.LatLngBounds(center);
//    map.fitBounds(bounds);
//    setMap(map);
//    map.setOptions({
//    gestureHandling: 'greedy',
		
//    });
//  }, []);

//  const onUnmount = React.useCallback(function callback() {
//    setMap(null);
//  }, []);

//  return (
//    <GoogleMap
//      mapContainerStyle={containerStyle}
//      center={center || { lat: -3.745, lng: -38.523 }} 
//      zoom={7}
//      onLoad={map=>setMap(map)}
//      onUnmount={onUnmount}
//      options={{mapId:'6bc5b02e6889cd76'}}
//    >

//      {source.length!=[]?<MarkerF
//      position={{lat:source.lat,lng:source.lng}}
//      icon={{
//        url:"/source.svg",
//        scaledSize:{
//          width:40,
//          height:40,
//        }
//      }}
//      >
//         <OverlayViewF
//      position={{lat:destination.lat,lng:destination.lng}}
//      mapPaneName={OverlayViewF.OVERLAY_MOUSE_TARGET}>  
//        <div className="overlayblock">
//      <p>{source.label}</p>
//        </div>
//      </OverlayViewF>
//      </MarkerF>
//        :null}
//      {destination.length!=[]?<MarkerF
//      position={{lat:destination.lat,lng:destination.lng}}
//      icon={{
//        url:"/source.svg",
//        scaledSize:{
//          width:40,
//          height:40,
//        }
//      }}
//      >
//      <OverlayViewF
//      position={{lat:destination.lat,lng:destination.lng}}
//      mapPaneName={OverlayViewF.OVERLAY_MOUSE_TARGET}>  
//        <div className="overlayblock">
//      <p>{destination.label}</p>
//        </div>
//      </OverlayViewF>
//      </MarkerF>:null}
    
//    <DirectionsRenderer
//    directions={directionRoutePoints}
//    options={{
//      polylineOptions:{
//        strokeColor: '#2169db',
//        strokeWeight: 3,
//      },
//      suppressMarkers:true
//    }}
//    />
//    </GoogleMap>
//  ) 

//}

//export default GoogleMapSection;


import React, { useContext, useState, useEffect } from 'react';
import MapContainer from './MapContainer';
import UserLocation from './UserLocation';
import MapMarker from './Marker';
import Directions from './Directions';
import Overlay from './Overlay';
import { SourceContext } from '../../Context/SourceContext';
import { DestinationContext } from '../../Context/DestinationContext';

function GoogleMapSection() {
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);
  const [center, setCenter] = useState();

  useEffect(() => {
    if (source && destination && !isNaN(source.lat) && !isNaN(source.lng) && !isNaN(destination.lat) && !isNaN(destination.lng)) {
      setCenter({
        lat: (source.lat + destination.lat) / 2,
        lng: (source.lng + destination.lng) / 2,
      });
    }
  }, [source, destination]);

  return (
    <MapContainer center={center}>
      <UserLocation setCenter={setCenter} />
      {source && typeof source.lat === 'number' && typeof source.lng === 'number' && (
        <>
          <MapMarker position={source} />
          <Overlay position={source} label={source.label} type="From" />
        </>
      )}
      {destination && typeof destination.lat === 'number' && typeof destination.lng === 'number' && (
        <>
          <MapMarker position={destination} />
          <Overlay position={destination} label={destination.label} type="To" />
        </>
      )}
      <Directions source={source} destination={destination} />
    </MapContainer>
  );
}

export default GoogleMapSection;