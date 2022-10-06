import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { useEffect, useMemo, useRef } from 'react';
import { Vector3 } from 'three';
import CloudsTexture from '../../assets/textures/Earth_Clouds.png';
import DayTexture from '../../assets/textures/Earth_Day.jpg';
import NightTexture from '../../assets/textures/Earth_Night.jpg';
import { useStore } from '../../store';
import { calculatePlanetPosition } from '../../utils/utils';
import { Ecliptic } from './Ecliptic';

export const Earth = (props) => {
  const earthRef = useRef(null);
  const cloudsRef = useRef(null);
  const { activePlanet, setActivePlanet, setPlanets, observeMode } = useStore();
  const [dayMap, nightMap, cloudsMap] = useTexture([
    DayTexture,
    NightTexture,
    CloudsTexture,
  ]);
  const uniforms = useMemo(() => {
    return {
      uSun: {
        value: new Vector3(0.01, 0, 0.01),
      },
      uDay: {
        value: dayMap,
      },
      uNight: {
        value: nightMap,
      },
    };
  }, [dayMap, nightMap]);

  const handlePlanet = (event) => {
    if (observeMode && activePlanet === earthRef.current) return;
    event.stopPropagation();
    setActivePlanet(earthRef.current);
  };

  useEffect(() => {
    setPlanets(earthRef.current);
  }, []);

  useFrame(({ clock }) => {
    // earthRef.current.rotation.y += 0.0001;
    cloudsRef.current.rotation.y += 0.00002;
  });

  return (
    <group>
      <mesh
        {...props}
        ref={earthRef}
        name="Earth"
        position={calculatePlanetPosition(props.orbitRadius, props.angle)}
        onClick={handlePlanet}
      >
        <sphereBufferGeometry args={[props.planetRadius, 32, 32]} />
        <shaderMaterial
          args={[
            {
              extensions: {
                derivatives: true,
              },
              uniforms: uniforms,
              vertexShader: `
              varying vec2 vUv;
              varying vec3 vNormal;
              varying vec3 vPos;
              varying vec3 vPosition;
              
              void main() {
                vPos = (modelMatrix * vec4(position, 1.0 )).xyz;
                vPosition = position;
                vUv = uv;
                vNormal = normal;

                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                gl_Position = projectionMatrix * mvPosition;
              }
              `,
              fragmentShader: `
                uniform sampler2D uDay;
                uniform sampler2D uNight;
                uniform vec3 uSun;
                varying vec2 vUv;
                varying vec3 vNormal;
                varying vec3 vPos;
                varying vec3 vPosition;

                vec4 toLinear(vec4 sRGB) {
                  bvec4 cutoff = lessThan(sRGB, vec4(0.04045));
                  vec4 higher = pow((sRGB + vec4(0.055))/vec4(1.055), vec4(2.4));
                  vec4 lower = sRGB/vec4(12.92);

                  return mix(higher, lower, cutoff);
                }

                void main() {
                  vec4 ambient = vec4(1., 1., 1., 1.);
                  vec3 dayColor = texture2D(uDay, vUv).rgb;
                  vec3 nightColor = texture2D(uNight, vUv).rgb;

                  float diff = dot(vNormal, normalize(uSun - vPos));

                  float specularLight = 0.9;
                  vec3 viewDirection = normalize(cameraPosition - vPos);
                  vec3 reflectionDirection = reflect(uSun, vNormal);
                  float specularAmount = pow(max(dot(viewDirection, reflectionDirection), 0.), 8.);
                  float specular = specularAmount * specularLight;

                  vec3 result = mix(nightColor, dayColor, diff);

                  gl_FragColor = toLinear(vec4(result, 1.));
                  // gl_FragColor = vec4(result, 1.);
                }
              `,
            },
          ]}
        />
      </mesh>
      <mesh
        ref={cloudsRef}
        position={calculatePlanetPosition(props.orbitRadius, props.angle)}
      >
        <sphereBufferGeometry args={[props.planetRadius + 0.02, 32, 32]} />
        <meshPhongMaterial map={cloudsMap} transparent />
      </mesh>
      <Ecliptic xRadius={props.orbitRadius} zRadius={props.orbitRadius} />
    </group>
  );
};
