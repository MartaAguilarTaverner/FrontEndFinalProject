import React from 'react';
import PropTypes from 'prop-types';
import { TabMenu } from 'primereact/tabmenu';

export default function AdminMenu({ activeIndex, setActiveIndex }) {
  const items = [
    {
      label: 'Home Types',
      icon: 'pi pi-fw pi-home'
    },
    {
      label: 'Room Types',
      icon: 'pi pi-fw pi-calendar'
    },
    {
      label: 'Rented Spaces',
      icon: 'pi pi-fw pi-pencil'
    }
  ];

  return <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />;
}

AdminMenu.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  setActiveIndex: PropTypes.func.isRequired
};
