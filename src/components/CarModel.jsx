import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";

const CarModel = ({ carColor, windowColor, wheelColor }) => {
  const { scene } = useGLTF("/car-modelnew.glb"); // Path to the GLTF file
  const carRef = useRef();

  useEffect(() => {
    if (scene) {
      console.log("Traversing the model to log part names...");

      scene.traverse((child) => {
        // Log the names of all parts in the model for debugging
        console.log("Part Name:", child.name);

        // Apply car body color
        if (child.isMesh && child.material && child.name.toLowerCase().includes("paint_0")) {
          console.log("Applying car color to:", child.name);
          child.material.color.set(carColor);
        }

        // Apply window color
        if (
          child.isMesh &&
          child.material &&
          (child.name.toLowerCase().includes("window_texture") ||
           child.name.toLowerCase().includes("glass_0"))
        ) {
          console.log("Applying window color to:", child.name);
          child.material.color.set(windowColor);
        }

        // Apply wheel color
        if (child.isMesh && child.material && child.name.toLowerCase().includes("wheel")) {
          console.log("Applying wheel color to:", child.name);
          child.material.color.set(wheelColor);
        }
      });
    }
  }, [carColor, windowColor, wheelColor, scene]); // Re-run the effect when any color or scene changes

  return (
    <primitive
      ref={carRef}
      object={scene}
      scale={[0.5, 0.5, 0.5]} // Adjust the scale as needed
      position={[0, 0, 0]} // Adjust the position as needed
    />
  );
};

export default CarModel;
