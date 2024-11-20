import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import CarConfigurator from "./pages/CarConfigurator";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/configurator" element={<CarConfigurator />} />
      </Routes>
    </Router>
  );
};

export default App;
