import React, { useState } from "react";
import "./App.css";
import MapComponent from "./components/MapComponent/MapComponent";
import PinAddForm from "./components/PinAddForm/PinAddForm";
import PinsList from "./components/PinsList/PinsList";
import { TPin } from "./types/pins";

function App() {
  const [pins, setPins] = useState<TPin[]>(
    [
      {
        name: '1',
        coordinates: { lat: 55.7380280351629, lng: 37.66958818891594 },
        key: ""
      },
      {
        coordinates: { lat: 55.79451852607696, lng: 37.676476439739076 },
        name: "2",
        key: ""
      },
      {
        coordinates: { lat: 55.75222, lng: 37.61556 },
        name: "3",
        key: ""
      }
    ]
  );

  for (let i = 0; i < pins.length; i++) {
    (pins[i] as TPin).key = `pin-${i}`;
  }

  return (
    <div className="App">
      <div className="pins">
        <PinAddForm />
        <PinsList pins={pins} />
      </div>
      <MapComponent pins={pins} />
    </div>
  );
}

export default App;
