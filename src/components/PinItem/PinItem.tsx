import React from 'react';
import type { TPin } from '../../types/pins';
import removeIcon from '../../assets/icons/remove.svg'

type TProps = {
  name: TPin['name'],
  pinKey: TPin['key'],
  deletePin: (pinKey: string) => void
};

const PinItem = ({ name, pinKey, deletePin }: TProps): JSX.Element => {

  return (
    <div className='pin-item'>
      <p className="pin-item__text">{name}</p>
      <button type='button' aria-label='Delete' className="pin-item__delete" onClick={() => deletePin(pinKey)} >
        <img src={removeIcon} alt="delete icon" />
      </button>
    </div>
  )
}

export default PinItem
