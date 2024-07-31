import type { Marker } from '@googlemaps/markerclusterer';
import React, { useCallback } from 'react';
import { AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { TPin } from '../../types/pins';

export type PinMarkerProps = {
  pin: TPin;
  onClick: (pin: TPin) => void;
  setMarkerRef: (marker: Marker | null, key: string) => void;
};

/**
 * Wrapper Component for an AdvancedMarker for a single tree.
 */
export const PinMarker = (props: PinMarkerProps) => {
  const { pin, onClick, setMarkerRef } = props;

  const handleClick = useCallback(() => onClick(pin), [onClick, pin]);
  const ref = useCallback(
    (marker: google.maps.marker.AdvancedMarkerElement) =>
      setMarkerRef(marker, pin.key),
    [setMarkerRef, pin.key]
  );

  return (
    <AdvancedMarker position={pin.coordinates} ref={ref} onClick={handleClick} draggable
      // onDrag={e =>
      //   setCenter({ lat: e.latLng?.lat() ?? 0, lng: e.latLng?.lng() ?? 0 })
      // }
    >
      <Pin />
    </AdvancedMarker>
  );
};
