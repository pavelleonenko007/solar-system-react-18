import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useStore } from '../../../store';
import { ObserveButton } from '../ObserveButton/ObserveButton';
import styles from './DynamicHeaderLink.module.scss';

export const DynamicHeaderLink = () => {
  const params = useParams();
  const { observeMode, setObserveMode } = useStore();
  const handleObserve = () => {
    setObserveMode(!observeMode);
  };
  const markup = params.planetId ? (
    <ObserveButton onClick={handleObserve} />
  ) : (
    <Link className={styles['about-link']} to={'/about-us'}>
      About us
    </Link>
  );
  return markup;
};
