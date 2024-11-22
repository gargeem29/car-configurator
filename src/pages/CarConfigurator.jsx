import React, { useState, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import CarModel from "../components/CarModel";
import Navbar from "../components/Navbar";
import "./CarConfigurator.css";
import { gsap } from "gsap";

// CameraController to control camera views
const CameraController = ({ changeViewRef }) => {
  const { camera } = useThree();

  // Set the camera to view the left side of the car by default
  camera.position.set(-10, 2, 0); // Left side view
  camera.lookAt(0, 1, 0); // Look at the center of the car

  changeViewRef.current = (position, target) => {
    gsap.to(camera.position, {
      x: position[0],
      y: position[1],
      z: position[2],
      duration: 1,
      ease: "power3.inOut",
      onUpdate: () => camera.lookAt(...target),
    });
  };

  return null;
};

// CarConfigurator component for the 3D interface and color customization options
const CarConfigurator = () => {
  const [carColor, setCarColor] = useState("#ffffff");
  const [windowColor, setWindowColor] = useState("#ffffff");
  const [wheelColor, setWheelColor] = useState("#ffffff");
  const changeViewRef = useRef(null);

  // Handle button click for changing camera view
  const handleButtonClick = (view, position, target) => {
    const button = document.getElementById(view);

    // Add a scale animation to the button for better UX
    gsap.to(button, { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1 });

    // Call the changeView function in the ref
    if (changeViewRef.current) {
      changeViewRef.current(position, target);
    }
  };

  // Handle car color change
  const handleCarColorChange = (event) => {
    setCarColor(event.target.value);
  };

  // Handle window color change
  const handleWindowColorChange = (event) => {
    setWindowColor(event.target.value);
  };

  // Handle wheel color change
  const handleWheelColorChange = (event) => {
    setWheelColor(event.target.value);
  };

  return (
    <div style={{ position: "relative", height: "100vh", width: "100%" }}>
      {/* Navbar */}
      <Navbar />

      {/* 3D Canvas */}
      <div className="configurator-container" style={{ height: "100%" }}>
        <Canvas shadows gl={{ antialias: true }}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[10, 10, 10]}
            intensity={2}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          <pointLight position={[5, 5, 5]} intensity={1.5} />

          {/* Camera Controller */}
          <CameraController changeViewRef={changeViewRef} />

          {/* Car Model */}
          <CarModel carColor={carColor} windowColor={windowColor} wheelColor={wheelColor} />

          {/* Environment */}
          <Environment preset="sunset" background={false} />

          {/* Orbit Controls */}
          <OrbitControls />
        </Canvas>
      </div>

      {/* Buttons for controlling the camera view */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 100,
          background: "rgba(255, 255, 255, 0.8)",
          padding: "10px",
          borderRadius: "8px",
        }}
      >
        {/* Front View Button */}
        <button
          id="front-view"
          onClick={() => handleButtonClick("front-view", [0, 1, 10], [0, 1, 0])}
          style={{ marginRight: "10px" }}
        >
          Front
        </button>

        {/* Rear View Button */}
        <button
          id="rear-view"
          onClick={() => handleButtonClick("rear-view", [0, 1, -10], [0, 1, 0])}
          style={{ marginRight: "10px" }}
        >
          Rear
        </button>

        {/* Top View Button */}
        <button
          id="top-view"
          onClick={() => handleButtonClick("top-view", [0, 10, 0], [0, 1, 0])}
          style={{ marginRight: "10px" }}
        >
          Top
        </button>
      </div>

      {/* Control Panel for Customization */}
      <div
        style={{
          position: "absolute",
          top: "100px",
          left: "20px",
          zIndex: 100,
          background: "rgba(255, 255, 255, 0.8)",
          padding: "10px",
          borderRadius: "8px",
        }}
      >
        {/* Car Color Picker */}
        <div>
          <h3>Choose Car Color</h3>
          <input
            type="color"
            value={carColor}
            onChange={handleCarColorChange}
            style={{ width: "60px", height: "30px" }}
          />
        </div>

        {/* Window Color Picker */}
        <div style={{ marginTop: "10px" }}>
          <h3>Choose Window Color</h3>
          <input
            type="color"
            value={windowColor}
            onChange={handleWindowColorChange}
            style={{ width: "60px", height: "30px" }}
          />
        </div>

        {/* Wheel Color Picker */}
        <div style={{ marginTop: "10px" }}>
          <h3>Choose Wheel Color</h3>
          <input
            type="color"
            value={wheelColor}
            onChange={handleWheelColorChange}
            style={{ width: "60px", height: "30px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default CarConfigurator;
