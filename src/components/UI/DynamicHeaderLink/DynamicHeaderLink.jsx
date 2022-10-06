import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useStore } from '../../../store';
import { ObserveButton } from '../ObserveButton/ObserveButton';
import styles from './DynamicHeaderLink.module.scss';

export const DynamicHeaderLink = ({ type = 'Link' }) => {
  const params = useParams();
  const { observeMode, setObserveMode } = useStore();
  const handleObserve = () => {
    setObserveMode(!observeMode);
  };
  const markup = params.planetId ? (
    <ObserveButton onClick={handleObserve} />
  ) : type === 'Link' ? (
    <Link className={styles['about-link']} to={'/about-us'}>
      About us
    </Link>
  ) : (
    <a className={styles['about-link']} href={'/about-us'}>
      About us
    </a>
  );
  return markup;
};
