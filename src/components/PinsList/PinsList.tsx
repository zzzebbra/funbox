import React from 'react'
import PinItem from '../PinItem/PinItem';
import type { TPin } from '../../types/pins';

type TProps = {
  pins: TPin[],
  deletePin: (key: string) => void
};

const PinsList = ({ pins, deletePin }: TProps): JSX.Element => {

  return (
    <div className='pin-list'>
      {pins.map(({ name, key }) => (<PinItem key={key} name={name} pinKey={key} deletePin={deletePin} />)
      )}
    </div>
  )
}

export default PinsList
