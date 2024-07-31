import React, { useCallback, useMemo, useState } from "react";
import {
  APIProvider,
  Map,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { type Marker } from '@googlemaps/markerclusterer';
import { Polyline } from "../Polyline/Polyline";
import { TPin, TPins } from "../../types/pins";
import { PinMarker } from "../PinMarker/PinMarker";

const MapComponent = ({ pins }: TPins) => {
  const initialCenter = { lat: 55.75222, lng: 37.61556 };
  const [center, setCenter] = useState(initialCenter);
  const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
  const [selectedPinKey, setSelectedPinKey] = useState<string | null>(null);

  const pinsCoordinates
   = pins.map((pin) => {
    return pin.coordinates
  });

  const selectedPin = useMemo(
    () =>
      pins && selectedPinKey
        ? pins.find(pin => pin.key === selectedPinKey)!
        : null,
    [pins, selectedPinKey]
  );

  // this callback will effectively get passsed as ref to the markers to keep
  // tracks of markers currently on the map
  const setMarkerRef = useCallback((marker: Marker | null, key: string) => {
    setMarkers(markers => {
      if ((marker && markers[key]) || (!marker && !markers[key]))
        return markers;

      if (marker) {
        return { ...markers, [key]: marker };
      }
      const { [key]: _, ...newMarkers } = markers;

      return newMarkers;

    });
  }, []);

  const handleInfoWindowClose = useCallback(() => {
    setSelectedPinKey(null);
  }, []);

  const handleMarkerClick = useCallback((pin: TPin) => {
    setSelectedPinKey(pin.key);
  }, []);

  const changeCenter = (newCenter: google.maps.LatLng | null) => {
    if (!newCenter) return;
    setCenter({ lng: newCenter.lng(), lat: newCenter.lat() });
  };

  return (
    <div className="map-component">
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string}>
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
            draggable
          />
          {pins && pins.map((pin) => {
            return <PinMarker
              key={pin.key}
              onClick={handleMarkerClick}
              setMarkerRef={setMarkerRef}
              pin={pin}
            />
          })}
          {selectedPinKey && (
            <InfoWindow
              anchor={markers[selectedPinKey]}
              onCloseClick={handleInfoWindowClose}>
              {selectedPin?.name}
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
    </div>
  )
}

export default MapComponent
