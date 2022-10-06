import React from 'react';
import { useParams } from 'react-router-dom';
import { getMissionDates } from '../../../utils/utils';
import styles from './Mission.module.scss';

export const Mission = ({ id, name, dates, thumbnail, countries }) => {
  const { planetId } = useParams();
  return (
    <div className={`${styles.missons_item} ${styles.mission}`}>
      <div className={styles.mission_thumbnail}>
        <img className={styles.mission_image} src={thumbnail} alt={name} />
      </div>
      <div className={styles.mission_info}>
        <div className={styles.mission_countries}>
          {countries.map((countrie) => (
            <div key={countrie} className={styles.country}>
              <img className={styles.country_flag} src={countrie} alt="" />
            </div>
          ))}
        </div>
        <div className={styles.mission_date}>
          {getMissionDates(dates, planetId)}
        </div>
        <h3 className={styles.mission_title}>{name}</h3>
      </div>
    </div>
  );
};
