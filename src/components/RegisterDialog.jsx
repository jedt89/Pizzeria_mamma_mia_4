import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/react';
import { useState } from 'react';
import { default as toast } from 'react-hot-toast';
import { TbLock, TbMail } from 'react-icons/tb';
import fields from './models/Fields';

const RegisterDialog = ({ registry, isOpen, onOpenChange, onClose }) => {
  const {
    USER,
    PASS,
    FIELD_EMPTY,
    REGISTRY_SUCCESSFULLY,
    LOGIN_SUCCESSFULLY,
    WRONG_PASS_MAIL,
    MIN_PASS,
    NOT_EQUAL_PASS
  } = fields;

  const [userMail, setUserMail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');
  const [repeatPassError, setRepeatPassError] = useState('');
  const [registryError, setRegistryError] = useState('');

  const checkFormData = () => {
    if (registry) {
      if (
        !userMail ||
        userMail == '' ||
        !userPassword ||
        userPassword == '' ||
        !repeatPassword ||
        repeatPassword == '' ||
        userPassword != repeatPassword
      ) {
        setRegistryError(EMPTY_FIELDS);
      } else if (
        userMail &&
        userPassword &&
        repeatPassword &&
        userPassword.length >= 6
      ) {
        onClose();
        clearModalData();
        setTimeout(
          () =>
            toast.success(REGISTRY_SUCCESSFULLY, {
              position: 'top-right'
            }),
          100
        );
      } else {
        return;
      }
    } else if (
      userMail === USER &&
      userPassword === PASS &&
      userPassword.length >= 6
    ) {
      onClose();
      clearModalData();
      setTimeout(
        () =>
          toast.success(LOGIN_SUCCESSFULLY, {
            position: 'top-right'
          }),
        100
      );
    } else {
      setRegistryError(WRONG_PASS_MAIL);
    }
  };

  const checkEmptyData = (value, type) => {
    let errorMessage = '';

    switch (type) {
      case 'email':
        if (!value) errorMessage = FIELD_EMPTY;
        break;
      case 'pass':
        if (!value) {
          errorMessage = FIELD_EMPTY;
        } else if (value.length < 6) {
          errorMessage = MIN_PASS;
        }
        break;
      case 'repeatPass':
        if (!value) {
          errorMessage = FIELD_EMPTY;
        } else if (value.length < 6) {
          errorMessage = MIN_PASS;
        } else if (value !== userPassword) {
          errorMessage = NOT_EQUAL_PASS;
        }
        break;
      default:
        console.warn('Unknown validation type:', type);
        break;
    }

    switch (type) {
      case 'email':
        setEmailError(errorMessage);
        break;
      case 'pass':
        setPassError(errorMessage);
        break;
      case 'repeatPass':
        setRepeatPassError(errorMessage);
        break;
      default:
        break;
    }
  };

  const clearModalData = () => {
    setUserMail('');
    setUserPassword('');
    setRepeatPassword('');
    setEmailError('');
    setPassError('');
    setRepeatPassError('');
    setRegistryError('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onOpenChange={onOpenChange}
      isDismissable={false}
      isKeyboardDismissDisabled
      size='xs'
      backdrop={'blur'}
    >
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1 modal-header'>
          {registry ? 'Regístrate' : 'Ingresa'}
        </ModalHeader>
        <ModalBody>
          <div className='card flex justify-content-center min-height-300'>
            <div className='flex flex-column gap-2rem width-100 min-height-200'>
              <div>
                <label>Correo electrónico</label>
                <Input
                  startContent={<TbMail />}
                  type='email'
                  variant='bordered'
                  isInvalid={!!emailError}
                  onChange={(e) => {
                    setRegistryError('');
                    setUserMail(e.target.value);
                    checkEmptyData(e.target.value, 'email');
                  }}
                  errorMessage={emailError}
                  className='modal-input'
                  color='warning'
                  radius='sm'
                />
              </div>

              <div>
                <label>Contraseña</label>
                <Input
                  startContent={<TbLock />}
                  type='password'
                  variant='bordered'
                  isInvalid={!!passError}
                  onChange={(e) => {
                    setRegistryError('');
                    setUserPassword(e.target.value);
                    checkEmptyData(e.target.value, 'pass');
                  }}
                  errorMessage={passError}
                  className='modal-input'
                  color='warning'
                  radius='sm'
                />
              </div>

              {registry && (
                <div>
                  <label>Repetir contraseña</label>
                  <Input
                    startContent={<TbLock />}
                    type='password'
                    variant='bordered'
                    isInvalid={!!repeatPassError}
                    onChange={(e) => {
                      setRegistryError('');
                      setRepeatPassword(e.target.value);
                      checkEmptyData(e.target.value, 'repeatPass');
                    }}
                    errorMessage={repeatPassError}
                    className='modal-input'
                    color='warning'
                    radius='sm'
                  />
                </div>
              )}
              {registryError && (
                <p className='validation-error'>{registryError}</p>
              )}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className='flex-column align-items-center'>
            <div className='display-flex justify-center gap-1rem modal-buttons'>
              <Button
                onClick={() => {
                  onClose();
                  clearModalData();
                }}
                variant='ghost'
                color='default'
              >
                Cancelar
              </Button>
              <Button
                onClick={() => checkFormData()}
                variant='ghost'
                color='warning'
              >
                Aceptar
              </Button>
            </div>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RegisterDialog;
