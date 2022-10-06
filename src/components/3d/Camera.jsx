import { OrbitControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { Vector3 } from 'three';
import { useStore } from '../../store';
import { calculatePlanetPosition } from '../../utils/utils';

export const Camera = () => {
  const { camera } = useThree();
  const { activePlanet, observeMode } = useStore();
  const ref = useRef(null);
  const noActiveRef = useRef(new Vector3(0, 0, 0));
  const timer = useRef(0);
  const lookAtNotObserve = useRef(new Vector3());

  useEffect(() => {
    timer.current = 0;
    if (activePlanet) {
      if (activePlanet.name !== 'Sun') {
        const hypotenuse = Math.sqrt(
          Math.pow(activePlanet.orbitRadius, 2) +
            Math.pow(activePlanet.planetRadius, 2)
        );
        const angle = (4 * activePlanet.orbitRadius) / hypotenuse;
        lookAtNotObserve.current = calculatePlanetPosition(
          activePlanet.orbitRadius,
          activePlanet.angle - angle,
          true,
          activePlanet.position.y
        );
      } else {
        lookAtNotObserve.current = new Vector3(0, 0, -6);
      }
    }
  }, [activePlanet]);

  useFrame((state, delta, xrFrame) => {
    if (activePlanet) {
      if (observeMode) {
        ref.current.target.lerp(activePlanet.position, delta);
      } else {
        ref.current.target.lerp(lookAtNotObserve.current, delta);
      }
      ref.current.minDistance = 1.1 * activePlanet.planetRadius;
    } else {
      ref.current.target.lerp(noActiveRef.current, delta);
      ref.current.minDistance = 2 * 6;
    }
    camera.updateProjectionMatrix();
  });

  return <OrbitControls ref={ref} camera={camera} maxDistance={150} />;
};
