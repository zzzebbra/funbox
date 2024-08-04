import type { Marker } from '@googlemaps/markerclusterer';
import React, { useCallback } from 'react';
import { AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import type { TPin } from '../../types/pins';

export type PinMarkerProps = {
  pin: TPin;
  onClick: (pin: TPin) => void;
  setMarkerRef: (marker: Marker | null, key: string) => void;
  setPins: React.Dispatch<React.SetStateAction<TPin[]>>
};

export const PinMarker = (props: PinMarkerProps) => {
  const { pin, onClick, setMarkerRef, setPins } = props;

  const handleClick = useCallback(() => onClick(pin), [onClick, pin]);
  const ref = useCallback(
    (marker: google.maps.marker.AdvancedMarkerElement) =>
      setMarkerRef(marker, pin.id),
    [setMarkerRef, pin.id]
  );

  return (
    <AdvancedMarker
      position={pin.coordinates}
      ref={ref}
      onClick={handleClick}
      draggable
      onDrag={(e) => {
        setPins((pins) => {
          const modifiedPin = pins.find(({ id }) => id === pin.id);
          modifiedPin!.coordinates.lat = e.latLng?.lat() as number;
          modifiedPin!.coordinates.lng = e.latLng?.lng() as number;

          return [...pins]
        })
      }}
    >
      <Pin />
    </AdvancedMarker>
  );
};
