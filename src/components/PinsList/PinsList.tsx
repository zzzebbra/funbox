import React from 'react'
import PinItem from '../PinItem/PinItem';
import type { TPins } from '../../types/pins';

const PinsList = ({ pins }: TPins): JSX.Element => {
  // const [pinsList, setPinsList] = useState(pins);
  return (
    <div>
      {pins && pins.map(({name, coordinates }) => {
        return (
          <PinItem key={name} name={name} coordinates={coordinates} />
        )
      })}
    </div>
  )
}

export default PinsList
