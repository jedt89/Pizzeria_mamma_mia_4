import { AiOutlineLogin } from 'react-icons/ai';
import { PiUserBold } from 'react-icons/pi';
import { RiLogoutCircleLine, RiUserAddLine } from 'react-icons/ri';
import { TbHome } from 'react-icons/tb';

export const navbarItems = [
  {
    key: 'home',
    label: (
      <a className='menu-label' href=''>
        Inicio
      </a>
    ),
    icon: <TbHome className='menu-icon' />,
    disabled: true,
    action: () => {}
  },
  {
    key: 'login',
    label: <span className='menu-label'>Ingresar</span>,
    icon: <AiOutlineLogin className='menu-icon' />,
    disabled: true,
    action: () => {}
  },
  {
    key: 'register',
    label: <span className='menu-label'>Registrarse</span>,
    icon: <RiUserAddLine className='menu-icon' />,
    disabled: true,
    action: () => {}
  },
  {
    key: 'profile',
    label: (
      <a className='menu-label' href=''>
        Perfil
      </a>
    ),
    icon: <PiUserBold className='menu-icon' />,
    disabled: true,
    action: () => {}
  },
  {
    key: 'logout',
    label: (
      <a className='menu-label' href=''>
        Cerrar sesión
      </a>
    ),
    icon: <RiLogoutCircleLine className='menu-icon' />,
    disabled: true,
    action: () => {}
  }
];
