import type { Marker } from "@googlemaps/markerclusterer";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AdvancedMarker, Pin, useMap } from "@vis.gl/react-google-maps";
import type { TPin } from "../../types/pins";

export type PinMarkerProps = {
  pin: TPin;
  onClick: (pin: TPin) => void;
  setMarkerRef: (marker: Marker | null, key: string) => void;
  setPins: React.Dispatch<React.SetStateAction<TPin[]>>;
};

export const PinMarker = (props: PinMarkerProps) => {
  const { pin, onClick, setMarkerRef, setPins } = props;

  const map = useMap();
  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (map) {
      setGeocoder(new google.maps.Geocoder())
    }
  }, [map]);

  useEffect(() => {
    if (geocoder) {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current)
      }

      timeoutId.current = setTimeout(() => {
        (async function getAddress() {
          await geocoder.geocode({ location: pin.coordinates }).then((response) => {
            setPins((pins) => {
              const modifiedPin = pins.find(({ id }) => id === pin.id);
              modifiedPin!.address = response.results[0].formatted_address;
              return [...pins];
            });
          });
        })();
      }, 200);

    }
  }, [pin.coordinates.lat, pin.coordinates.lng])

  const handleClick = useCallback(() => onClick(pin), [onClick, pin]);
  const ref = useCallback(
    (marker: google.maps.marker.AdvancedMarkerElement) =>
      setMarkerRef(marker, pin.id),
    [setMarkerRef, pin.id],
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
          return [...pins];
        });
      }}
    >
      <Pin />
    </AdvancedMarker>
  );
};
