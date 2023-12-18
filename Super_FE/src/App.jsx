import React from "react";
import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start/Start";
import First from "./pages/First/First";
import Main from "./pages/Main/Main";
import Compare from "./pages/compare/compare";
import CompareResult from "./pages/compare/CompareResult";

import Search from "./pages/Search/Search";
import SearchResult from "./pages/Search/SearchResult";
import "./index.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/First" element={<First />} />
        <Route path="/Main" element={<Main />} />
        <Route path="/Compare" element={<Compare />} />
        <Route path="/CompareResult" element={<CompareResult />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/SearchResult" element={<SearchResult />} />
      </Routes>
    </div>
  );
}
export default App;
