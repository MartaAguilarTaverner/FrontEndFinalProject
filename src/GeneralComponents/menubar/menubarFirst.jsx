import { useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../../User/store/user.store';

const UpMenu = () => {
  const navigate = useNavigate;
  const token = useSelector((state) => state.user.token);
  const isAdmin = useSelector((state) => state.use.isAdmin);
  const isOwner = useSelector((state) => state.user.isOwner);
  const dispatch = useDispatch();

  const items = [
    {
      label: '',
      icon: 'pi pi-fw pi-home',
      command: () => navigate('/home')
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
          command: () => navigate('/profile')
        },
        {
          label: 'LogOut',
          visible: token !== '',
          command: () => {
            dispatch(logout());
            navigate('/home');
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
          visible: !isOwner && token !== '',
          command: () => navigate('/regspace')
        }
      ]
    }
  ];

  const start = <img src="RentSpaceLogo.png" alt="logo" className="mr-2 logo" />;
  const end = <InputText placeholder="search" type="text" />;

  return <Menubar className="upmenu" model={items} start={start} />;
};

export default UpMenu;
