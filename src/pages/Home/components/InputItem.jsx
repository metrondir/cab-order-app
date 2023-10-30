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
		type=='source'
		?setPlaceholder('Pickup Location')
		:setPlaceholder('Dropoff Location')
	},[type]);

	const getLatAndLng=(place,type) =>{
	const placeId=place.value.place_id;
	const service= new window.google.maps.places.PlacesService(document.createElement('div'));
	service.getDetails({placeId},(place,status)=>{
		if(status==='OK' && place.geometry && place.geometry.location){
			if(type==='source'  && place.geometry && place.geometry.location)
			{
				setSource({
					lat: place.geometry.location.lat(),
					lng:place.geometry.location.lng(),
					name:place.formatted_address,
					label:place.name
				})
			}
			else{
				setDestination({
					lat: place.geometry.location.lat(),
					lng:place.geometry.location.lng(),
					name:place.formatted_address,
					label:place.name
				})
			}
		}
	})
	}
  return (
	
	 <div className='bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4'>
		<GooglePlacesAutocomplete
		
		selectProps={{
			value,
			onChange: (place)=>{getLatAndLng(place,type);setValue(place)},
			placeholder:'Pickup Location',
			isClearable: true,
			className:'w-full',
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