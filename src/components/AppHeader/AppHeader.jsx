import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { CustomAppLink } from '../UI/CustomAppLink/CustomAppLink';
import styles from './AppHeader.module.scss';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import { DynamicHeaderLink } from '../UI/DynamicHeaderLink/DynamicHeaderLink';
import { useStore } from '../../store';

export const AppHeader = () => {
  const params = useParams();
  const { observeMode } = useStore();
  return (
    <div className={styles.header}>
      <div className="container container--appheader">
        <div className={styles.header_wrapper}>
          {!observeMode && (
            <Link to={'/'} className={styles.header_logo}>
              <Logo />
            </Link>
          )}
          {!observeMode && (
            <nav className={'header_nav ' + styles.nav}>
              <ul className={styles.nav_list}>
                <li className={styles.nav_item}>
                  <CustomAppLink
                    to={
                      params.planetId && params.planetId !== 'Moon'
                        ? `/planets/${params.planetId}`
                        : 'planets'
                    }
                    className={styles.nav_link}
                  >
                    Planets
                  </CustomAppLink>
                </li>
                <li className={styles.nav_item}>
                  <CustomAppLink
                    to={'moons'}
                    className={styles.nav_link}
                    style={{ pointerEvents: 'none' }}
                  >
                    Moons
                  </CustomAppLink>
                </li>
                <li className={styles.nav_item}>
                  <CustomAppLink
                    to={
                      params.planetId
                        ? `missions/${params.planetId}/`
                        : 'missions'
                    }
                    className={styles.nav_link}
                  >
                    Missions
                  </CustomAppLink>
                </li>
              </ul>
            </nav>
          )}
          <DynamicHeaderLink />
        </div>
      </div>
    </div>
  );
};
