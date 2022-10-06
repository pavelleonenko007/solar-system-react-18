import React from 'react';
import { useStore } from '../../../store';
import Rotate from '../../../assets/images/rotate.svg';
import { CloseButton } from '../CloseButton/CloseButton';
import styles from './ObserveButton.module.scss';

export const ObserveButton = (props) => {
  const { observeMode } = useStore();
  return !observeMode ? (
    <button {...props} className={styles.observe}></button>
  ) : (
    <div>
      <CloseButton {...props} />
    </div>
  );
};
