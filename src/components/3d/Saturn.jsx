import { Detailed, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { Vector3 } from 'three';
import Texture from '../../assets/textures/Saturn.jpg';
import RingsTexture from '../../assets/textures/Saturn_Rings.png';
import { useStore } from '../../store';
import { calculatePlanetPosition } from '../../utils/utils';
import { Ecliptic } from './Ecliptic';
export const Saturn = (props) => {
  const ref = useRef(null);
  const ringGeoRef = useRef(null);
  const [colorMap, rings] = useTexture([Texture, RingsTexture]);
  const { activePlanet, setActivePlanet, setPlanets, observeMode } = useStore();
  const handlePlanet = (event) => {
    if (observeMode && activePlanet === ref.current) return;
    event.stopPropagation();
    setActivePlanet(ref.current);
  };

  useFrame(() => {
    ref.current.rotation.y += 0.0001;
  });

  useEffect(() => {
    const geometry = ringGeoRef.current;
    const pos = geometry.attributes.position;
    var v3 = new Vector3();
    for (let i = 0; i < pos.count; i++) {
      v3.fromBufferAttribute(pos, i);
      geometry.attributes.uv.setXY(i, v3.length() < 5 ? 0 : 1, 1);
    }

    setPlanets(ref.current);
  }, []);

  return (
    <group>
      <mesh
        {...props}
        ref={ref}
        name="Saturn"
        position={calculatePlanetPosition(props.orbitRadius, props.angle)}
        onClick={handlePlanet}
        castShadow
        receiveShadow
      >
        <sphereBufferGeometry args={[props.planetRadius, 32, 32]} />
        <meshPhysicalMaterial map={colorMap} />
      </mesh>
      <mesh
        position={calculatePlanetPosition(props.orbitRadius, props.angle)}
        rotation={[1.8, 0, 0.3]}
        receiveShadow
      >
        <ringBufferGeometry
          ref={ringGeoRef}
          args={[props.planetRadius + 0.5, props.planetRadius + 3.5, 64]}
        />
        <meshPhysicalMaterial
          map={rings}
          transparent
          side={2}
          // shadowSide={BackSide}
        />
      </mesh>
      <Ecliptic xRadius={props.orbitRadius} zRadius={props.orbitRadius} />
    </group>
  );
};
