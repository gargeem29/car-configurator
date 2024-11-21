import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";

const CarModel = ({ carColor }) => {
  const { scene } = useGLTF("/car-modelnew.glb");  // Assuming car model path is correct
  const carRef = useRef();

  // This effect will run when the carColor prop changes
  useEffect(() => {
    console.log("Selected Car Color: ", carColor);  // Log the selected color
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        if (child.name.includes("Body")) {
          child.material.color.set(carColor);
        }
      }
    });
  }, [carColor, scene]);
   // Re-run the effect when carColor changes

  return <primitive ref={carRef} object={scene} scale={[0.5, 0.5, 0.5]} position={[0, 0, 0]} />;
};

export default CarModel;
