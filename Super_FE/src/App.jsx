import React from "react";
import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start/Start";
import First from "./pages/First/First";
import Main from "./pages/Main/Main";
import Compare from "./pages/compare/compare";

import "./index.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/First" element={<First />} />
        <Route path="/Main" element={<Main />} />
        <Route path="/Compare" element={<Compare />} />
      </Routes>
    </div>
  );
}
export default App;
