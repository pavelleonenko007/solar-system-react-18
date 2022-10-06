import React from 'react';
import styles from './CloseButton.module.scss';

export const CloseButton = (props) => {
  return <button {...props} className={styles.close}></button>;
};
