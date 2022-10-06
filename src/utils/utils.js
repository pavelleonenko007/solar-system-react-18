import { Vector3 } from 'three';

export const calculatePlanetPosition = (
  orbitRadius,
  angle,
  asVector3 = false,
  y
) => {
  const position = new Vector3(
    orbitRadius * Math.cos((angle * Math.PI) / 180),
    y || 0,
    orbitRadius * Math.sin((angle * Math.PI) / 180)
  );

  return asVector3 ? position : position.toArray();
};

export const getMissionDates = (dates, planetId) => {
  if (typeof dates === 'object' && dates !== null) {
    return planetId ? dates[planetId] : Object.values(dates)[0];
  } else {
    return dates;
  }
};
