"use client"
import React, {useState} from 'react'
import { SourceContext } from '../Context/SourceContext'
import GoogleMapSection from './components/GoogleMapSection'
import SearchSection from './components/SearchSection'
import { DestinationContext } from '../Context/DestinationContext'
import { LoadScript } from '@react-google-maps/api'


function Home() {
const [source,setSource]=useState([])
const [destination,setDestination]=useState([])
  return (
	<SourceContext.Provider value={{source,setSource}}>
	<DestinationContext.Provider value={{destination,setDestination}}>
		<LoadScript
		
		libraries={['places']}
		googleMapsApiKey={process.env.REACT_APP_NEXT_PUBLIC_API_KEY}>
	 <div className='p-6 grid grid-cols-1 md:grid-cols-3 gap-5'>
		<div>
			<SearchSection/>
		</div>
		<div className='col-span-2'>
      <GoogleMapSection />
		</div>
	 </div>
	 </LoadScript>
	 </DestinationContext.Provider>
	 </SourceContext.Provider>
  )
}

export default Home
