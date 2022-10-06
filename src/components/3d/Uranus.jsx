import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import Texture from '../../assets/textures/Uranus.jpg';
import { useStore } from '../../store';
import { calculatePlanetPosition } from '../../utils/utils';
import { Ecliptic } from './Ecliptic';
export const Uranus = (props) => {
  const ref = useRef(null);
  const colorMap = useTexture(Texture);
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
    setPlanets(ref.current);
  }, []);

  return (
    <group>
      <mesh
        {...props}
        ref={ref}
        name="Uranus"
        position={calculatePlanetPosition(props.orbitRadius, props.angle)}
        onClick={handlePlanet}
      >
        <sphereBufferGeometry args={[props.planetRadius, 32, 32]} />
        <meshPhysicalMaterial map={colorMap} />
      </mesh>
      <Ecliptic xRadius={props.orbitRadius} zRadius={props.orbitRadius} />
    </group>
  );
};
