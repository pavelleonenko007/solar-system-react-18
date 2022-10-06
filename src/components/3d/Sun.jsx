import { useTexture } from '@react-three/drei';
import { useFrame, useLoader } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import SunMap from '../../assets/textures/Sun.jpg';
import { useStore } from '../../store';
import { Rays } from './Rays';

export default function Sun() {
  const colorMap = useTexture(SunMap);
  const sunRef = useRef(null);
  const ref = useRef(null);
  const { activePlanet, setActivePlanet, setPlanets, observeMode } = useStore();
  const handlePlanet = (event) => {
    if (observeMode && activePlanet === sunRef.current) return;
    event.stopPropagation();
    setActivePlanet(sunRef.current);
  };

  useFrame(() => {
    sunRef.current.rotation.y += 0.0001;
  });

  useEffect(() => {
    setPlanets(sunRef.current);
  }, []);

  return (
    <group>
      <mesh
        angle={0}
        orbitRadius={0}
        planetRadius={6}
        ref={sunRef}
        name="Sun"
        onClick={handlePlanet}
      >
        <sphereBufferGeometry args={[6, 32, 32]} />
        <meshBasicMaterial map={colorMap} />
      </mesh>
      {sunRef.current && (
        <Rays
          sun={sunRef.current}
          samples={30}
          density={0.97}
          decay={0.75}
          weight={0.6}
          exposure={0.9}
          blur
        />
      )}
    </group>
  );
}
