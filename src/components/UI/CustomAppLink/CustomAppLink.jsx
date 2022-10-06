import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

export const CustomAppLink = ({ children, to, ...props }) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: false });
  return (
    <Link
      {...props}
      style={{
        border: match ? '1px solid #fff' : '1px solid transparent',
        ...props.style,
      }}
      to={to}
    >
      {children}
    </Link>
  );
};
