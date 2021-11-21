import React, { Suspense } from "react";
import {
  Box,
  Html,
  softShadows,
  useProgress,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Knight } from "./components/knight";

softShadows();

function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(0)} % loaded</Html>;
}

export const App = () => (
  <Canvas shadows={true}>
    <ambientLight intensity={0.5} />
    <directionalLight
      position={[0, 10, 0]}
      intensity={1.5}
      castShadow={true}
      shadow-mapSize-height={1024}
      shadow-mapSize-width={1024}
      shadow-camera-far={50}
      shadow-camera-left={-10}
      shadow-camera-right={10}
      shadow-camera-top={10}
      shadow-camera-bottom={-10}
    />
    <Suspense fallback={<Loader />}>
      <Knight />
    </Suspense>
    <Box position={[0, 1, 0]} />
    <Box position={[-2, 1, 2]} />
    <mesh receiveShadow={true} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <shadowMaterial attach="material" opacity={0.3} />
    </mesh>
  </Canvas>
);
