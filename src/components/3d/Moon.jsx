import React, { useEffect, useRef } from 'react';
import { useStore } from '../../store';
import { calculatePlanetPosition } from '../../utils/utils';
import Texture from '../../assets/textures/Moon.jpg';
import { useTexture } from '@react-three/drei';

export const Moon = (props) => {
  const ref = useRef(null);
  const colorMap = useTexture(Texture);
  const { activePlanet, setActivePlanet, setPlanets, observeMode } = useStore();
  const handlePlanet = (event) => {
    if (observeMode && activePlanet === ref.current) return;
    event.stopPropagation();
    setActivePlanet(ref.current);
  };

  useEffect(() => {
    setPlanets(ref.current);
  }, []);

  return (
    <mesh
      {...props}
      ref={ref}
      name="Moon"
      type="moon"
      position={calculatePlanetPosition(
        props.orbitRadius,
        props.angle,
        false,
        6
      )}
      onClick={handlePlanet}
    >
      <sphereBufferGeometry args={[props.planetRadius, 32, 32]} />
      <meshPhysicalMaterial map={colorMap} />
    </mesh>
  );
};
