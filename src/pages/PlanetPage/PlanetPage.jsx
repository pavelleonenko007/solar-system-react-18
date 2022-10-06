import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useStore } from '../../store';
import styles from './PlanetPage.module.scss';

export const PlanetPage = () => {
  const location = useLocation();
  const params = useParams();
  const { planets, setActivePlanet } = useStore();
  const [planetData, setPlanetData] = useState({});

  useEffect(() => {
    const matched = location.pathname.includes('moons');
    const endpoint = matched ? 'moons' : 'planets';
    fetch(`../../data/${endpoint}.json`)
      .then((response) => response.json())
      .then((data) =>
        setPlanetData(data.find((planet) => planet.id === params.planetId))
      )
      .catch((e) => console.error(e));
  }, [params.planetId]);

  return (
    <div className={styles.planet}>
      <div className="container">
        <div className={styles.planet_wrapper}>
          <h1 className={styles.planet_name}>{planetData.name}</h1>
          <div
            className={styles.planet_content}
            dangerouslySetInnerHTML={{ __html: planetData.description }}
          ></div>
          <div className={`${styles.planet_bullets} ${styles.bullets}`}>
            {planetData.bullets &&
              planetData.bullets.map((bullet) => (
                <div key={bullet.title} className="bullets_item">
                  <div className={styles.bullets_value}>{bullet.value}</div>
                  <div className={styles.bullets_title}>{bullet.title}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
