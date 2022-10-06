import React from 'react';
import { Outlet } from 'react-router-dom';
import { useStore } from '../../../store';
import { ScrollNavbar } from '../../UI/ScrollNavbar/ScrollNavbar';

export const MissionsLayout = () => {
  const dates = [
    {
      name: '2010',
    },
    {
      name: '2011',
    },
    {
      name: '2012',
    },
    {
      name: '2013',
    },
    {
      name: '2014',
    },
    {
      name: '2015',
    },
    {
      name: '2016',
    },
    {
      name: '2017',
    },
    {
      name: '2018',
    },
    {
      name: '2019',
    },
    {
      name: '2020',
    },
    {
      name: '2021',
    },
    {
      name: '2022',
    },
    {
      name: '2023',
    },
    {
      name: '2024',
    },
  ];
  const { observeMode } = useStore();
  return (
    !observeMode && (
      <div>
        <Outlet />
        <ScrollNavbar data={dates} isMissions />
      </div>
    )
  );
};
