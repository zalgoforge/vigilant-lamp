import React, { useEffect, useMemo, useRef } from "react";
import { OrbitControls, softShadows, Box, RoundedBox } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Material, Mesh, Vector2, Raycaster, MeshPhongMaterial } from "three";

softShadows();

const state = Array.from({ length: 10 }, () =>
  Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => 0))
);

const Board = () => {
  const { camera } = useThree();
  const raycaster = useMemo(() => new Raycaster(), []);
  const boardRef = useRef<THREE.Object3D>();

  useEffect(() => {
    const mouse = new Vector2();
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    const onClick = (e: MouseEvent) => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(
        boardRef.current?.children || []
      );
      if (intersects.length) {
        const [target] = intersects;
        if (target.object) {
          const material = (target.object as Mesh)
            .material as MeshPhongMaterial;
          material.color.set(0x00ff00);
        }
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <group ref={boardRef}>
      {state.map((row, x) =>
        row.map((col, y) =>
          col.map((_, z) => (
            <group key={`${x}-${y}-${z}`}>
              <RoundedBox
                args={[1, 1, 1]}
                radius={0.05}
                smoothness={4}
                position={[x, y, z]}
              >
                <meshPhongMaterial attach="material" color="#f3f3f3" />
              </RoundedBox>
            </group>
          ))
        )
      )}
    </group>
  );
};

export const App = () => {
  return (
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
      <Board />
      <group position={[-0.5, -0.5, -0.5]}>
        <Box args={[10, 0.1, 10]} position={[0, 0, 0]}>
          <meshPhongMaterial
            attach="material"
            color="#f30000"
            opacity={0.4}
            transparent={true}
          />
        </Box>
      </group>
      <OrbitControls />
    </Canvas>
  );
};
