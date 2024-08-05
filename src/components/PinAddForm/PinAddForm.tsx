import React, { FormEvent, useEffect, useState } from "react";
import { useMap } from "@vis.gl/react-google-maps";
import type { TPin } from "../../types/pins";

type TProps = {
  setPins: React.Dispatch<React.SetStateAction<TPin[]>>;
};

const PinAddForm = ({ setPins }: TProps) => {
  const map = useMap();
  const [pinName, setPinName] = useState("");
  const [address, setAddress] = useState('');
  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null);

  useEffect(() => {
    if (map) {
      setGeocoder(new google.maps.Geocoder())
    }
  }, [map]);

  useEffect(() => {
    if(geocoder){
      (async function getAddress() {
        await geocoder.geocode({ location: {lat: map?.getCenter()?.lat() as number, lng: map?.getCenter()?.lng() as number} }).then((response) => { setAddress(response.results[0].formatted_address) });
      })();
    }
  }, [map?.getCenter(), geocoder])


  const onInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPinName(evt.target.value);
  };

  const addPin = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const newPin = {} as TPin;
    newPin.name = pinName;
    newPin.coordinates = {
      lat: map?.getCenter()?.lat() as number,
      lng: map?.getCenter()?.lng() as number,
    };
    newPin.id = window.crypto.randomUUID();
    newPin.address = address;
    setPins((pins) => {
      return [...pins, newPin];
    });
    setPinName("");
  };

  return (
    <form onSubmit={(evt) => addPin(evt)}>
      <input
        className="add-input"
        type="text"
        value={pinName}
        onChange={onInputChange}
        data-cy="pin-add-input"
      />
      <button
        className={pinName ? "add-button" : "add-button add-button_disabled"}
        type="submit"
        disabled={!pinName}
        data-cy="pin-add-button"
      >
        Add new Pin
      </button>
    </form>
  );
};

export default PinAddForm;
