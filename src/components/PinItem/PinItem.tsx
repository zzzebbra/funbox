import React from 'react';
import type { TPin } from '../../types/pins';

const PinItem = ({name, coordinates }: TPin): JSX.Element => {
  return (
    <div className='pin-item'>
      <p className="pin-item__text">{name}</p>
      <p>lat: {coordinates.lat}, lng: {coordinates.lng}</p>
      <button type='button' aria-label='Delete' className="pin-item__delete"/>
    </div>
  )
}

export default PinItem
