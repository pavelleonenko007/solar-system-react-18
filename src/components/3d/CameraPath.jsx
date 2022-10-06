import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react';
import { CatmullRomCurve3, Vector3 } from 'three';
import { useStore } from '../../store';
import { calculatePlanetPosition } from '../../utils/utils';

function easeInOutCubic(x) {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

export const CameraPath = (props) => {
  const { activePlanet, observeMode } = useStore();
  const { camera } = useThree();
  const tubeRef = useRef(null);
  const timer = useRef(0);
  const y = useRef(0);
  const pRef = useRef(new Vector3());
  const points = [];

  for (let i = 0; i <= 20; i++) {
    let p = pRef.current
      .clone()
      .lerpVectors(
        camera.position,
        activePlanet
          ? calculatePlanetPosition(
              activePlanet.orbitRadius - 1.5 * activePlanet.planetRadius,
              activePlanet.angle,
              true,
              activePlanet.position.y
            )
          : new Vector3(0, 150, 0),
        i / 20
      );
    // p.setComponent(1, p.y + (p.length() / 8) * Math.sin((Math.PI * i) / 60));
    p.y = p.y * 1 + Math.sin(Math.PI * (i / 20));

    points.push(p);
  }

  const curve = new CatmullRomCurve3(points);

  useEffect(() => {
    timer.current = 0;
  }, [activePlanet, observeMode]);

  useFrame(({ clock }) => {
    if (!Math.round(points[0].distanceTo(points[points.length - 1]))) return;
    if (timer.current < 1) {
      timer.current += 0.002;
      y.current = easeInOutCubic(timer.current);
    } else {
      timer.current = 1;
    }

    const point = tubeRef.current.parameters.path.getPointAt(y.current);
    camera.position.copy(point);
    // if (!timer.current) {
    //   timer.current = clock.elapsedTime;
    // }
    // const progress = (clock.elapsedTime - timer.current) / 5;
    // if (progress < 1) {
    // const point = tubeRef.current.parameters.path.getPointAt(
    //   easeInOutCubic(progress)
    // );
    // camera.position.copy(point);
    // }
  });

  return (
    <group>
      <mesh {...props}>
        <tubeBufferGeometry
          ref={tubeRef}
          args={[curve, points.length, 0, 18, false]}
        />
        <meshBasicMaterial color={'#ffffff'} />
      </mesh>
    </group>
  );
};
