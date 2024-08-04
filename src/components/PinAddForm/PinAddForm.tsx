import React, { FormEvent, useState } from 'react'
import { useMap } from '@vis.gl/react-google-maps';
import type { TPin } from '../../types/pins';

type TProps = {
  setPins: React.Dispatch<React.SetStateAction<TPin[]>>
}

const PinAddForm = ({ setPins }: TProps) => {
  const map = useMap();
  const [pinName, setPinName] = useState('');

  const onInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPinName(evt.target.value);
  };

  const addPin = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const newPin = {} as TPin;
    newPin.name = pinName;
    newPin.coordinates = { lat: map?.getCenter()?.lat() as number, lng: map?.getCenter()?.lng() as number };
    newPin.key = window.crypto.randomUUID();
    setPins((pins) => { return [...pins, newPin] });
    setPinName('');
  };

  return (
    <form onSubmit={(evt) => addPin(evt)}>
      <input className='add-input' type='text' value={pinName} onChange={onInputChange} />
      <button className={pinName ? 'add-button' : 'add-button add-button_disabled'}
        type='submit'
        disabled={!pinName}>
        Add new Pin
      </button>
    </form>
  )
}

export default PinAddForm
