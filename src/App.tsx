import React from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import "./App.css";

function App() {
  const mapCenter = { lat: 55.75222, lng: 37.61556 };
  return (
    <div className="App">
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string}>
        <Map
          zoom={11}
          center={mapCenter}
          mapId={process.env.REACT_APP_GOOGLE_MAPS_MAP_ID}
        />
      </APIProvider>
    </div>
  );
}

export default App;
