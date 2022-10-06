import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Mission } from '../../components/UI/Mission/Mission';
import { getMissionDates } from '../../utils/utils';
import styles from './MissionsPage.module.scss';

export const MissionsPage = () => {
  const params = useParams();
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    const fetchMissions = async (planet) => {
      const response = await fetch('../../data/missions.json');
      const allMissions = await response.json();
      const settedMissions = planet
        ? allMissions.filter((mission) => mission.planetId.includes(planet))
        : allMissions;

      const compareByYears = (a, b) => {
        const date1String = getMissionDates(a.dates, planet);
        const date2String = getMissionDates(b.dates, planet);
        const date1Number = Number(date1String.match(/\d{4}/)[0]);
        const date2Number = Number(date2String.match(/\d{4}/)[0]);

        return date1Number - date2Number;
      };

      settedMissions.sort(compareByYears);

      setMissions(settedMissions);
    };

    fetchMissions(params.planetId);
  }, []);

  return (
    <div className={styles.missons}>
      <div className="container">
        <div className={styles.missons_wrapper}>
          <div className={`${styles.missons_title} ${styles.title}`}>
            <h1 className={styles.title_head}>
              {params.planetId ? params.planetId : 'All'}
            </h1>
            <div className={styles.title_sub}>missions</div>
          </div>
          <div className={styles.missons_list}>
            {missions.map((mission) => (
              <Mission key={mission.id} {...mission} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
