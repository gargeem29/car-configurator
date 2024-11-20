import React, { useState, useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Environment} from "@react-three/drei";
import { BoxHelper } from "three";
import CarModel from "../components/CarModel";
import Navbar from "../components/Navbar";
import "./CarConfigurator.css";

const CameraController = ({ position, target }) => {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(...position); // Set the camera position
    camera.lookAt(...target); // Set the camera to look at the target
  }, [position, target, camera]);

  return null;
};

const CarConfigurator = () => {
  const [cameraPosition, setCameraPosition] = useState([0, 2, 5]); // Default position
  const [cameraTarget, setCameraTarget] = useState([0, 1, 0]); // Default target

  const changeView = (position, target) => {
    setCameraPosition(position);
    setCameraTarget(target);
  };

  return (
    <div style={{ position: "relative", height: "100vh", width: "100%" }}>
      <Navbar />

      {/* 3D Canvas */}
      <div className="configurator-container" style={{ height: "100%" }}>
        <Canvas shadows gl={{ antialias: true }}>
          {/* Add the CameraController */}
          <CameraController position={cameraPosition} target={cameraTarget} />

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

          {/* Car Model */}
          <CarModel />

          {/* Environment */}
          <Environment preset="sunset" background={false} />

          {/* Optional Axes Helper for Debugging */}
          <axesHelper args={[5]} />

      

          {/* Orbit Controls */}
          <OrbitControls />
        </Canvas>
      </div>

      {/* Buttons */}
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
        <button
          onClick={() => changeView([0, 1, 10], [0, 1, 0])} // Front View
          style={{ marginRight: "10px" }}
        >
          Front
        </button>
        <button
          onClick={() => changeView([0, 1, -10], [0, 1, 0])} // Rear View
          style={{ marginRight: "10px" }}
        >
          Rear
        </button>
        <button
          onClick={() => changeView([0, 10, 0], [0, 1, 0])} // Top View
          style={{ marginRight: "10px" }}
        >
          Top
        </button>
      </div>
    </div>
  );
};

export default CarConfigurator;
