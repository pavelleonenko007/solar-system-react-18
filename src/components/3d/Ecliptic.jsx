import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { BufferGeometry } from 'three';
import { Vector3 } from 'three';

export const Ecliptic = ({ xRadius = 0, zRadius = 0 }) => {
  const eclipticRef = useRef(null);
  const points = [];
  for (let index = 0; index < 64; index++) {
    const angle = (index / 64) * 2 * Math.PI;
    const x = xRadius * Math.cos(angle);
    const z = zRadius * Math.sin(angle);
    points.push(new Vector3(x, 0, z));
  }

  useEffect(() => {
    if (eclipticRef.current) {
      eclipticRef.current.matrixAutoUpdate = false;
    }
  }, []);

  points.push(points[0]);

  const lineGeometry = new BufferGeometry().setFromPoints(points);
  return (
    <line ref={eclipticRef} geometry={lineGeometry}>
      <lineBasicMaterial attach="material" color="#333333" linewidth={1} />
    </line>
  );
};
