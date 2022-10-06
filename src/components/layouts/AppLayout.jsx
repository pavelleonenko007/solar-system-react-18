import React, { useEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useStore } from '../../store';
import { AppHeader } from '../AppHeader/AppHeader';

export const AppLayout = () => {
  const { planets, activePlanet, setActivePlanet } = useStore();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.planetId) {
      setActivePlanet(
        planets.find((planet) => planet.name === params.planetId)
      );
    } else {
      setActivePlanet(null);
    }
  }, [params.planetId, planets]);

  useEffect(() => {
    if (activePlanet) {
      activePlanet.type === 'moon'
        ? navigate('moons/' + activePlanet.name)
        : navigate('planets/' + activePlanet.name);
    }
  }, [activePlanet]);
  return (
    <div className="App">
      <AppHeader />
      <Outlet />
    </div>
  );
};
