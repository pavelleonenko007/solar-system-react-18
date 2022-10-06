import React, { useEffect, useRef } from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import styles from './ScrollBarLink.module.scss';

export const ScrollBarLink = ({ children, to, isClickable, ...props }) => {
  const ref = useRef(null);
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: false });

  useEffect(() => {
    if (match) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [match]);

  return (
    <Link
      ref={ref}
      to={to}
      className={`${styles['scroll-link']} ${
        match ? styles['scroll-link--active'] : ''
      }`}
      style={{ pointerEvents: isClickable ? 'all' : 'none' }}
      {...props}
    >
      {children}
    </Link>
  );
};
