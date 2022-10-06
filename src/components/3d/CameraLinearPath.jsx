import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { TubeGeometry } from 'three';
import { CatmullRomCurve3 } from 'three';
import { Vector3 } from 'three';
import { useStore } from '../../store';
import { calculatePlanetPosition } from '../../utils/utils';

function easeInOutCubic(x) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function easeInOutSine(x) {
  return -(Math.cos(Math.PI * x) - 1) / 2;
}

export const CameraLinearPath = (props) => {
  const { activePlanet } = useStore();
  const { camera } = useThree();
  const timer = useRef(0);
  const points = [];

  for (let i = 0; i <= 60; i++) {
    let p = new Vector3().lerpVectors(
      camera.position,
      activePlanet
        ? calculatePlanetPosition(
            activePlanet.orbitRadius - 1.5 * activePlanet.planetRadius,
            activePlanet.angle,
            true
          )
        : new Vector3(0, 150, 0),
      i / 60
    );

    // p.y = p.y * (1 + Math.sin(Math.PI * (i / 60)));

    points.push(p);
  }

  const curve = new CatmullRomCurve3(points);
  const geometry = new TubeGeometry(curve, points.length, 0.1, 18, false);

  useEffect(() => {
    timer.current = 0;
  }, [activePlanet]);

  useFrame(({ clock }) => {
    if (!timer.current) {
      timer.current = clock.elapsedTime;
    }
    // const progress = (clock.elapsedTime - timer.current) / 5;
    // if (progress < 1) {
    //   const point = geometry.parameters.path.getPointAt(
    //     easeInOutSine(progress)
    //   );
    //   // console.log(progress);
    //   camera.position.copy(point);
    // }
  });

  return (
    <mesh geometry={geometry} {...props}>
      <meshBasicMaterial color={'#FF0000'} />
    </mesh>
  );
};
