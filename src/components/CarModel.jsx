import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { TextureLoader, EquirectangularReflectionMapping, BoxHelper } from "three";

const CarModel = () => {
  const car = useGLTF("/car-modelnew.glb");

  useEffect(() => {
    // Set up environment map for metallic materials
    const loader = new TextureLoader();
    const environmentMap = loader.load("/textures/environment.jpg"); // Example environment map
    environmentMap.mapping = EquirectangularReflectionMapping;

    car.scene.traverse((child) => {
      if (child.isMesh && child.material) {
        if (child.material.metalness) {
          // Apply environment map to metallic materials
          child.material.envMap = environmentMap;
          child.material.needsUpdate = true;
        }
      }
    });
  }, [car]);

  return <primitive object={car.scene} scale={[2,2,2]} />;
};

export default CarModel;
