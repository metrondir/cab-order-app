import React, {useState} from 'react'
import CarListItem from './CarListItem'
import { CarListData } from '../../../utils/CarListData'
 function CarListOptions({distance}) {
	const [activeIndex, setActiveIndex] = useState();
  return (
	 <div className='carListContainer'>
		<h2 className='carListTitle'> Recommended</h2>
	 	{CarListData.map((item,index)=>( 
			<div className={`carListItem ${activeIndex==index?'carListItemActive':''}`} onClick={()=>setActiveIndex(index)}>
				<CarListItem car={item} distance={distance}/>
			</div>
	 
		))}
			</div>
  )
}
export default CarListOptions
