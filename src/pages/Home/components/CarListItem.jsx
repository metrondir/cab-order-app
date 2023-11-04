import React from 'react';
import { HiUser } from 'react-icons/hi2';

function CarListItem({ car, distance }) {
  return (
    <div className='carListItemContainer'>
      <div className='carListItemDetails'>
        <img src={car.image} alt="car" width={100} height={100} />
        <div>
          <h2 className='carListItemName'>
            {car.name}
            <span className='carListItemSeat'>
              <HiUser />{car.seat}
            </span>
          </h2>
          <p>{car.desc}</p>
        </div>
      </div>
      <h2 className='carListItemAmount'>${(car.amount * distance).toFixed(2)}</h2>
    </div>
  );
}

export default CarListItem;