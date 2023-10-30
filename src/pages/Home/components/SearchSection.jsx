"use client"

import React ,{useContext, useEffect} from 'react'
import  InputItem from './InputItem'
import { SourceContext } from '../../Context/SourceContext';
import { DestinationContext } from '../../Context/DestinationContext';
function SearchSection() {
	const{source,setSource}=useContext(SourceContext);
	const{destination,setDestination}=useContext(DestinationContext);

	useEffect(()=>{
		if(source){
			console.log(source)
		}

		if(destination)
		{
				console.log("---",destination)
		}
	},[source,destination])
  return (
	 <div className='p-2 md:pd-6 border-[2px] rounded-xl'>
		<p className='tex-[20px] font-bold'>Get a ride</p>
		<InputItem type='source'/>
		<InputItem type='destination'/>	 

	 <button className='p-3 bg-black w-full mt-5 text-white rounded-lg'>Search</button>
	 </div>
  )
}

export default SearchSection
