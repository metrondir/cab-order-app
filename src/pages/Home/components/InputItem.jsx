"use client"
import React ,{useContext, useEffect, useState} from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { DestinationContext } from '../../Context/DestinationContext';
import { SourceContext } from '../../Context/SourceContext';

function InputItem({type}) {

	const [value,setValue]= useState(null);
	const [placeholder,setPlaceholder]=useState(null);
	const{source,setSource}=useContext(SourceContext);
	const{destination,setDestination}=useContext(DestinationContext);

	useEffect(()=>{
		type==='source'
		?setPlaceholder('Pickup Location')
		:setPlaceholder('Dropoff Location')
	},[type]);

	const getLatAndLng = (place, type) => {
		if (place && place.value && place.value.place_id) {
		  const placeId = place.value.place_id;
		  const service = new window.google.maps.places.PlacesService(document.createElement('div'));
		  service.getDetails({ placeId }, (place, status) => {
			 if (status === 'OK') {
				if (place.geometry && place.geometry.location) {
				  const lat = place.geometry.location.lat();
				  const lng = place.geometry.location.lng();
				  if (typeof lat === 'number' && typeof lng === 'number') {
					 const location = {
						lat: lat,
						lng: lng,
						name: place.formatted_address,
						label: place.name,
					 };
					 if (type === 'source') {
						setSource(location);
					 } else {
						setDestination(location);
					 }
				  } else {
					 console.error('Invalid lat or lng:', lat, lng);
				  }
				} else {
				  console.error('Selected place does not have a geometry or location');
				}
			 } else {
				console.error('Error getting place details:', status);
			 }
		  });
		} else {
		  console.error('Selected place does not have a place_id');
		}
	 };

  return (
	 <div className='inputMainDiv'>
		<GooglePlacesAutocomplete
		selectProps={{
			value,
			onChange: (place)=>{getLatAndLng(place,type);setValue(place)},
			placeholder: placeholder,
			isClearable: true,
			className:'googleautocomplete',
			components:{
				DropdownIndicator:false
			},
			styles: {
				control: (provided) => ({
				  ...provided,
				  background: '#00ffff00',
				  border: 'none'
				}),
			}
		}}
		/>
	 </div>
  )
}

export default InputItem