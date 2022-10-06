import { Stars, Stats, useProgress } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect } from 'react';
import { useStore } from '../../store';
import { Camera } from './Camera';
import { CameraPath } from './CameraPath';
import { Earth } from './Earth';
import { Jupiter } from './Jupiter';
import { Mars } from './Mars';
import { Mercury } from './Mercury';
import { Moon } from './Moon';
import { Neptune } from './Neptune';
import { Pluto } from './Pluto';
import { Saturn } from './Saturn';
import Sun from './Sun';
import { Uranus } from './Uranus';
import { Venus } from './Venus';

function CustomLoader() {
  const { progress } = useProgress();
  const { setLoading } = useStore();
  useEffect(() => {
    if (progress == 100) {
      setLoading(false);
    }

    return () => {
      console.log('Delete loader');
    };
  }, [progress]);
  return null;
}

export const Scene = () => {
  return (
    <Canvas
      camera={{ fov: 60, position: [0, 150, 0], far: 500 }}
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        pointerEvents: 'all',
      }}
      shadows
    >
      <ambientLight intensity={0.01} />
      <pointLight
        position={[0, 0, 0]}
        color={'#ffffff'}
        intensity={1}
        castShadow
        decay={2}
        shadow-bias={-0.002}
        shadow-mapSize-height={1024}
        shadow-mapSize-width={1024}
        shadow-blurSamples={30}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <Suspense fallback={null}>
        <Sun />
        <Mercury orbitRadius={10} angle={10} planetRadius={1.5} />
        <Venus orbitRadius={20} angle={30} planetRadius={1.7} />
        <Earth orbitRadius={30} angle={60} planetRadius={3} />
        <Moon orbitRadius={33} angle={63} planetRadius={0.7} />
        <Mars orbitRadius={40} angle={105} planetRadius={2.8} />
        <Jupiter orbitRadius={50} angle={170} planetRadius={4} />
        <Saturn orbitRadius={60} angle={230} planetRadius={3.5} />
        <Uranus orbitRadius={70} angle={260} planetRadius={2.8} />
        <Neptune orbitRadius={80} angle={300} planetRadius={2.5} />
        <Pluto orbitRadius={90} angle={330} planetRadius={2} />
        <Camera />
        <CameraPath />
      </Suspense>
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
      />
      {/* <Stats /> */}
    </Canvas>
  );
};
