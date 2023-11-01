"use client"

import React ,{ useContext } from 'react'
import  InputItem from './InputItem'

function SearchSection() {

  return (
	 <div className='searchSection'>
		<p className='headingSection'>Get a ride</p>
		<InputItem type='source' />
		<InputItem type='destination' />	 
	 <button className='buttonSearch'>Search</button>
	 </div>
  )
}

export default SearchSection
