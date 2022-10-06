import { softShadows } from '@react-three/drei';
import { Route, Routes } from 'react-router-dom';
import { Scene } from './components/3d/Scene';
import { AppLayout } from './components/layouts/AppLayout';
import { MissionsLayout } from './components/layouts/MissionsLayout/MissionsLayout';
import { PlanetsLayout } from './components/layouts/PlanetsLayout/PlanetsLayout';
import { Loader } from './components/UI/Loader/Loader';
import { AboutPage } from './pages/AboutPage/AboutPage';
import { HomePage } from './pages/HomePage';
import { MissionsPage } from './pages/MissionsPage/MissionsPage';
import { PlanetPage } from './pages/PlanetPage/PlanetPage';
import { useStore } from './store';

softShadows();

function App() {
  const { loadingCanvas, loadingLoader } = useStore();
  return (
    <>
      <Scene />
      {!loadingLoader && !loadingCanvas ? (
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="planets" element={<PlanetsLayout />}>
              <Route path=":planetId" element={<PlanetPage />} />
            </Route>
            <Route path="moons" element={<PlanetsLayout />}>
              <Route path=":planetId" element={<PlanetPage />} />
              <Route path=":planetId/missions" element={<MissionsPage />} />
            </Route>
            <Route path="missions" element={<MissionsLayout />}>
              <Route index element={<MissionsPage />} />
              <Route path=":planetId" element={<MissionsPage />} />
              <Route path=":planetId/:year" element={<MissionsPage />} />
            </Route>
          </Route>
          <Route path="about-us" element={<AboutPage />} />
          <Route path="loader" element={<Loader />} />
        </Routes>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default App;
