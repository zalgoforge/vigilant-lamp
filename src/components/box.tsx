import React, { FC, useMemo, useRef, useState } from "react";
import { CircleBufferGeometry } from "three";
import { MeshProps } from "@react-three/fiber";

type Props = MeshProps;

export const Box: FC<Props> = (props) => {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef<MeshProps>();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  // useFrame((state, delta) => (ref.current!.rotation.x += 0.01));
  // Return the view, these are regular Threejs elements expressed in JSX
  const geom = useMemo(() => new CircleBufferGeometry(1, 16), []);
  return (
    <lineSegments>
      <edgesGeometry attach="geometry" args={[geom]} />
      <lineBasicMaterial color="red" attach="material" />
    </lineSegments>
  );
};
