import React from "react";
import { useThree } from "@react-three/fiber";
import { gsap } from "gsap";

const ControlPanel = ({ changeView }) => {
  const { camera } = useThree(); // Access the camera from the Canvas context

  const updateView = (x, y, z) => {
    changeView(x, y, z); // Update camera position from parent
    gsap.to(camera.position, {
      x,
      y,
      z,
      duration: 1,
      onUpdate: () => camera.lookAt(0, 0, 0), // Keep looking at the center
    });
  };

  return (
    <group>
      <mesh position={[0, -1, 0]}>
        <planeGeometry args={[5, 1]} />
        <meshBasicMaterial color="teal" />
      </mesh>
    </group>
  );
};

export default ControlPanel;
