import React from "react";
import MapContainer from "./components/MapContainer";
const GothenburgCoords = {
  lat: 57.705063,
  lng: 11.970454
};
function App(props) {
  return (
    <div className="App">
      <MapContainer center={GothenburgCoords} />
    </div>
  );
}

export default App;
