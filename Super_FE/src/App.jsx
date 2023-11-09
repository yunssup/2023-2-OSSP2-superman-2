import React from "react";
import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start/Start";
import First from "./pages/First/First";

import "./index.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/First" element={<First />} />
      </Routes>
    </div>
  );
}
export default App;
