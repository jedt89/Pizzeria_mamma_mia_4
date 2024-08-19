import { PiShoppingCart } from 'react-icons/pi';
import {
  RiMenuUnfold4Line
} from 'react-icons/ri';
import brand from '../assets/img/brand.png';

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/react';

const Navbar = ({ token, total, items, disabledButtons, cartOpen }) => {
  return (
    <>
      <div className='nav-container'>
        <div>
          <a href=''>
            <img src={brand} style={{ width: '80px' }} />
          </a>
        </div>
        <h1 className='nav-title'>Pizzería Mamma mía</h1>
        <div className='navbar-buttons-container'>
          <Button
            className='navbar-button'
            startContent={<PiShoppingCart />}
            variant='ghost'
            color='warning'
            onClick={cartOpen}
          >
            <span>${total.toLocaleString('es-CL')}</span>
          </Button>
          <Dropdown>
            <DropdownTrigger>
              <Button
                className='navbar-button'
                startContent={<RiMenuUnfold4Line />}
                variant='ghost'
                color='warning'
              ></Button>
            </DropdownTrigger>
            <DropdownMenu disabledKeys={disabledButtons} disableAnimation={true}>
              {items.map(({ key, label, icon, action }) => {
                return (
                  <DropdownItem
                    startContent={icon}
                    key={key}
                    className='item'
                    onClick={action}
                  >
                    {label}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </>
  );
};
export default Navbar;
