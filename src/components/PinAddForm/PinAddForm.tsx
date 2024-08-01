import React, { useState } from 'react'
import { useMap } from '@vis.gl/react-google-maps';
import { TPin } from '../../types/pins';

type TProps = {
  setPins: React.Dispatch<React.SetStateAction<TPin[]>>
}

const PinAddForm = ({setPins}: TProps ) => {
  const map = useMap();
  const [pinName, setPinName] = useState('');

  const onInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPinName(evt.target.value);
  };

  const addPin = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    const newPin = {} as TPin;
    newPin.name = pinName;
    newPin.coordinates = {lat: map?.getCenter()?.lat(), lng: map?.getCenter()?.lng()};
    newPin.key = `pin-${pinName}`;
    setPins((pins) => { return [...pins, newPin] });
    setPinName('');
  };

  return (
    <form onSubmit={(evt) => addPin(evt)}>
      <input className='add-input' type='text' value={pinName} onChange={onInputChange} />
      <button className='add-button' type='submit'disabled={!pinName}>Add new Pin</button>
    </form>
  )
}

export default PinAddForm
