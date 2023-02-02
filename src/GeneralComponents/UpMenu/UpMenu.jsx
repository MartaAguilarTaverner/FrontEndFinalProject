import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';

import { logout } from '../../User/store/user.store';

import './UpMenu.css';

export default function UpMenu() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.id);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const isOwner = useSelector((state) => state.user.isOwner);
  const dispatch = useDispatch();

  const items = [
    {
      label: '',
      icon: 'pi pi-fw pi-home',
      command: () => navigate('/')
    },
    {
      label: 'User',
      icon: 'pi pi-fw pi-user',
      items: [
        {
          label: 'Login',
          visible: token === '',
          command: () => navigate('/login')
        },
        {
          label: 'Register',
          visible: token === '',
          command: () => navigate('/register')
        },
        {
          label: 'User List',
          visible: token !== '' && isAdmin,
          command: () => navigate('/user-list')
        },
        {
          label: 'Profile',
          visible: token !== '',
          command: () => navigate(`/profile/${userId}`)
        },
        {
          label: 'Logout',
          visible: token !== '',
          command: () => {
            dispatch(logout());
            navigate('/');
          }
        }
      ]
    },
    {
      label: 'Owner',
      icon: 'pi pi-fw pi-home',
      visible: token !== '',
      items: [
        {
          label: 'Become an owner',
          visible: !isOwner && token !== '',
          command: () => navigate('/register-space')
        },
        {
          label: 'Your Place',
          visible: isOwner && token !== '',
          command: () => navigate('/your-place')
        }
      ]
    },
    {
      label: 'Reservations',
      icon: 'pi pi-fw pi-calendar',
      visible: token !== '',
      items: [
        {
          label: 'Your Reservations',
          visible: token !== '',
          command: () => navigate('/reservation')
        },
        {
          label: 'Reservations List',
          visible: token !== '',
          command: () => navigate('/reservation-list')
        }
      ]
    },
    {
      label: 'Reviews',
      icon: 'pi pi-fw pi-calendar',
      visible: token !== '',
      items: [
        {
          label: 'Your Reviews',
          visible: token !== '',
          command: () => navigate('/reviews')
        },
        {
          label: 'Reviews List',
          visible: token !== '',
          command: () => navigate('/review-list')
        }
      ]
    },
    {
      label: 'Admin',
      visible: isAdmin && token !== '',
      command: () => navigate('/admin')
    }
  ];

  const start = <img src="RentSpaceLogo.png" alt="logo" className="logo" />;

  return <Menubar className="upmenu" model={items} start={start} />;
}
