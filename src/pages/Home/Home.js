"use client"
import React, {useState} from 'react'
import { SourceContext } from '../Context/SourceContext'
import GoogleMapSection from './components/GoogleMapSection'
import SearchSection from './components/SearchSection'
import { DestinationContext } from '../Context/DestinationContext'
import  Header  from './components/Header'
import { LoadScript } from '@react-google-maps/api'
import './components/Home.css'

function Home() {
const [source,setSource]=useState([])
const [destination,setDestination]=useState([])
  return (
	<SourceContext.Provider value={{source,setSource}}>
	<DestinationContext.Provider value={{destination,setDestination}}>
		<LoadScript
		
		libraries={['places']}
		googleMapsApiKey={process.env.REACT_APP_NEXT_PUBLIC_API_KEY}>
<Header/>
	 <div className='homeDiv'>
		<div className='sectionDiv'>
			<SearchSection/>
		</div>
		<div className='googleMap'>
      <GoogleMapSection/>
		</div>
	 </div>
	 </LoadScript>
	 </DestinationContext.Provider>
	 </SourceContext.Provider>
  )
}

export default Home
