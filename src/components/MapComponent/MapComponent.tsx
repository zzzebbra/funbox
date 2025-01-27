import React, { useCallback, useMemo, useState } from "react";
import {
  Map,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { type Marker } from '@googlemaps/markerclusterer';
import { Polyline } from "../Polyline/Polyline";
import type { TPin } from "../../types/pins";
import { PinMarker } from "../PinMarker/PinMarker";

export type TProps = { pins: TPin[], setPins: React.Dispatch<React.SetStateAction<TPin[]>> }

const MapComponent = ({ pins, setPins }: TProps) => {
  const initialCenter = { lat: 55.75222, lng: 37.61556 };
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const [selectedPinKey, setSelectedPinKey] = useState<string | null>(null);

  const pinsCoordinates = pins.map((pin) => pin.coordinates);

  const selectedPin = useMemo(
    () =>
      pins && selectedPinKey
        ? pins.find(pin => pin.id === selectedPinKey)!
        : null,
    [pins, selectedPinKey]
  );

  const setMarkerRef = useCallback((marker: Marker | null, key: string) => {
    setMarkers((prevMarkers) => {
      if ((marker && prevMarkers[key]) || (!marker && !prevMarkers[key]))
        return prevMarkers;

      if (marker) {
        return { ...prevMarkers, [key]: marker };
      }
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { [key]: _, ...newMarkers } = prevMarkers;

      return newMarkers;

    });
  }, []);

  const handleInfoWindowClose = useCallback(() => {
    setSelectedPinKey(null);
  }, []);

  const handleMarkerClick = useCallback((pin: TPin) => {
    setSelectedPinKey(pin.id);
  }, []);

  return (
    <div className="map-component">
      <Map
        defaultZoom={11}
        defaultCenter={initialCenter}
        mapId={process.env.REACT_APP_GOOGLE_MAPS_MAP_ID}
        fullscreenControl={false}
      >
        <Polyline
          path={pinsCoordinates}
          strokeWeight={6}
          strokeColor="#ff22cc88"
        />
        {pins.map((pin) => {
          return (
            <PinMarker
              key={pin.id}
              onClick={handleMarkerClick}
              setMarkerRef={setMarkerRef}
              setPins={setPins}
              pin={pin}
            />)
        })}
        {selectedPinKey && (
          <InfoWindow
            anchor={markers[selectedPinKey]}
            onCloseClick={handleInfoWindowClose}>
            {selectedPin?.name}
          </InfoWindow>
        )}
      </Map>
    </div>
  )
}

export default MapComponent
