import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import CarConfigurator from "./pages/CarConfigurator";

const App = () => {
  const [carColor, setCarColor] = useState("#ff0000"); // Default color: red

  // Handle color change for the car
  const handleColorChange = (color) => {
    setCarColor(color);
  };

  return (
    <Router>
      <Routes>
        {/* Login Page Route */}
        <Route path="/" element={<LoginPage />} />

        {/* Car Configurator Route */}
        <Route
          path="/configurator"
          element={
            <CarConfigurator
              carColor={carColor}
              onColorChange={handleColorChange}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
