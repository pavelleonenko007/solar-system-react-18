import { EffectComposer, GodRays } from '@react-three/postprocessing';
import React from 'react';

export const Rays = (props) => {
  return (
    <EffectComposer multisampling={0}>
      <GodRays {...props} />
    </EffectComposer>
  );
};
