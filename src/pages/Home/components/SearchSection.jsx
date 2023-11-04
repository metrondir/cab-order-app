"use client"

import React ,{ useContext ,useState} from 'react'
import  InputItem from './InputItem'
import { SourceContext } from '../../Context/SourceContext'
import { DestinationContext } from '../../Context/DestinationContext'
import CarListOptions from './CarListOptions'
const google = window.google
function SearchSection() {
const {source, setSource} = useContext(SourceContext)
const {destination, setDestination} = useContext(DestinationContext)
const [distance, setDistance] = useState();
const calculateDistance = () => {
	if (window.google && window.google.maps && window.google.maps.geometry && window.google.maps.geometry.spherical) {
	  const dist = window.google.maps.geometry.spherical.computeDistanceBetween(
		 new window.google.maps.LatLng(source.lat, source.lng),
		 new window.google.maps.LatLng(destination.lat, destination.lng)
	  );
	  setDistance(dist*0.001239160565);
	}
 };

	return (
		<div>
	 <div className='searchSection'>
		<p className='headingSection'>Get a ride</p>
		<InputItem type='source' className='inputItem' />
		<InputItem type='destination' className='inputItem' />	 
	 <button className='buttonSearch' onClick={()=>calculateDistance()}>Search</button>
	 </div>
	 {distance?<CarListOptions distance={distance} />:null}
	 </div>
  )
}

export default SearchSection
