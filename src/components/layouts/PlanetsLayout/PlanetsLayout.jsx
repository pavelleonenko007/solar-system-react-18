import { useState } from 'react';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useStore } from '../../../store';
import { ScrollNavbar } from '../../UI/ScrollNavbar/ScrollNavbar';
import styles from './PlanetsLayout.module.scss';

export const PlanetsLayout = () => {
  const location = useLocation();
  const { observeMode } = useStore();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const matches = location.pathname.includes('moons');
      try {
        const endpoint = matches ? 'moons' : 'planets';
        const response = await fetch(`../../data/${endpoint}.json`);
        const data = await response.json();

        setData(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [location.pathname]);
  return (
    <div className={styles['planets-layout']}>
      {!observeMode && <Outlet />}
      <ScrollNavbar
        data={data}
        isMissions={location.pathname.includes('moons')}
      />
    </div>
  );
};
