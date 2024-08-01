import React, { useState } from "react";
import "./App.css";
import { APIProvider } from "@vis.gl/react-google-maps";
import MapComponent from "./components/MapComponent/MapComponent";
import PinAddForm from "./components/PinAddForm/PinAddForm";
import PinsList from "./components/PinsList/PinsList";
import { TPin } from "./types/pins";

function App() {
  const [pins, setPins] = useState<TPin[]>([]);

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string}>
      <div className="App">
        <div className="pins">
          <PinAddForm setPins={setPins} />
          <PinsList pins={pins} />
        </div>
        <MapComponent pins={pins} setPins={setPins} />
      </div>
    </APIProvider>
  );
}

export default App;
