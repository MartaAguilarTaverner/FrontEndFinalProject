import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

import { logout } from '../../User/store/user.store';

import './menubarFirst.css';

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
          label: 'Trips',
          visible: token !== '',
          command: () => navigate('/trips')
        },
        {
          label: 'Profile',
          visible: token !== '',
          command: () => navigate(`/profile/${userId}`)
        },
        {
          label: 'LogOut',
          visible: token !== '',
          command: () => {
            dispatch(logout());
            navigate('/');
          }
        }
      ]
    },
    {
      label: 'BeOwner',
      icon: 'pi pi-fw pi-home',
      visible: token !== '',
      items: [
        {
          label: 'Post your space',
          visible: !isOwner && token !== '', // se convierte en owner
          command: () => navigate('/regspace')
        },
        {
          label: 'Your Place',
          visible: isOwner && token !== '',
          command: () => navigate('/myplace')
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
  const end = <InputText placeholder="search" type="text" />;

  return <Menubar className="upmenu" model={items} start={start} end={end} />;
}
