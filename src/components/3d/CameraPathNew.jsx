import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import {
  BufferGeometry,
  CatmullRomCurve3,
  LineCurve3,
  TubeGeometry,
  Vector3,
} from 'three';
import { useStore } from '../../store';
import { calculatePlanetPosition } from '../../utils/utils';

function easeInOutCubic(x) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

export const CameraPathNew = (props) => {
  const { activePlanet, observeMode } = useStore();
  const y = useRef(0);
  const points = useRef([]);
  const timer = useRef(0);
  const curve = useRef(new LineCurve3());
  const geometry = useRef(null);
  const { camera } = useThree();

  useEffect(() => {
    timer.current = 0;
    const endPosition = activePlanet
      ? calculatePlanetPosition(
          activePlanet.orbitRadius - 1.5 * activePlanet.planetRadius,
          activePlanet.angle,
          true
        )
      : new Vector3(0, 150, 0);
    curve.current.v1 = camera.position;
    curve.current.v2 = endPosition;
    points.current = curve.current.getPoints(20);

    for (let i = 0; i < points.current.length; i++) {
      const point = points.current[i];
      point.y = point.y * 1 + Math.sin(Math.PI * (i / points.current.length));
    }
  }, [activePlanet, observeMode]);

  useFrame(({ clock }) => {
    // if (
    //   !Math.round(
    //     points.current[0].distanceTo(points.current[points.current.length - 1])
    //   )
    // )
    //   return;
    // if (timer.current < 1) {
    //   timer.current += 0.002;
    //   y.current = easeInOutCubic(timer.current);
    // } else {
    //   timer.current = 1;
    // }
    // const point = tubeRef.current.parameters.path.getPointAt(y.current);
    // camera.position.copy(point);
  });

  return <tubeGeometry args={[]} />;
};
