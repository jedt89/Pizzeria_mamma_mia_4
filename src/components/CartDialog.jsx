import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/react';
import React from 'react';
import { CartPizzaCard } from '.';
import fields from './models/Fields';

const CartDialog = ({
  cartClose,
  cartIsOpen,
  pizzaList,
  setPizzaList,
  setTotalPrice,
  totalPrice
}) => {
  const { CART_DIALOG_TITLE } = fields;

  return (
    <Modal
      isOpen={cartIsOpen}
      onClose={cartClose}
      size='xl'
      backdrop='blur'
      isDismissable={false}
      isKeyboardDismissDisabled
      scrollBehavior='inside'
    >
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1rem modal-header'>
          {CART_DIALOG_TITLE}
        </ModalHeader>
        <ModalBody className='flex flex-column gap-1rem width-100'>
          {pizzaList.map((pizza, index) => (
            <CartPizzaCard
              key={index}
              {...pizza}
              setTotalPrice={setTotalPrice}
              setPizzaList={setPizzaList}
            />
          ))}
          {pizzaList.length === 0 && 
          <h2>No tienes productos en tu carrito de compras</h2>
          }
        </ModalBody>
        <ModalFooter>
          <div className='flex-column align-items-center gap-1rem'>
            <div className='display-flex gap-1rem'>
              <div>Total a pagar: </div>
              <h2 style={{ color: 'orange' }}>
                ${parseInt(totalPrice).toLocaleString('es-CL')}
              </h2>
            </div>
            <div className='display-flex justify-center gap-1rem modal-buttons'>
              <Button onClick={cartClose} variant='ghost' color='default'>
                Cancelar
              </Button>
              <Button onClick={cartClose} variant='ghost' color='warning'>
                Pagar
              </Button>
            </div>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CartDialog;
