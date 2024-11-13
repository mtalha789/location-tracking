
import React from "react";
import CustomMap from './component/CutomMap.jsx'
import { APIProvider } from "@vis.gl/react-google-maps";
// import "./App.css";

const App = () => {
  return (
    <div className="app">
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
        <CustomMap />
      </APIProvider>
    </div>
  );
};

export default App;
