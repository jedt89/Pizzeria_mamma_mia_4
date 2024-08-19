import { useDisclosure } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { default as toast } from 'react-hot-toast';
import { CartDialog, Footer, Home, Navbar } from './components';
import { navbarItems } from './components/models/menu';
import pizzaData from './components/models/pizzas';
import RegisterDialog from './components/RegisterDialog';
import fields from './models/Fields';
import { getPizzas } from './service/fetchPizzas';

function App() {
  const [registry, setRegistry] = useState(false);
  const [pizzas, setPizzas] = useState(pizzaData);
  const [pizzaList, setPizzaList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const { PIZZA_LIST_UPDATED } = fields;

  const {
    onOpen: registerDialogOpen,
    onClose: registerDialogClose,
    isOpen: registerDialogIsOpen
  } = useDisclosure();

  const {
    onOpen: cartOpen,
    onClose: cartClose,
    isOpen: cartIsOpen
  } = useDisclosure();

  const showRegistryModal = (isRegistry) => {
    if (registerDialogIsOpen) return;
    setRegistry(isRegistry);
    registerDialogOpen();
  };

  const disabledButtons = navbarItems
    .map((item) => {
      if (item.key === 'login') item.action = () => showRegistryModal(false);
      if (item.key === 'register') item.action = () => showRegistryModal(true);
      return item;
    })
    .filter((item) =>
      ['login', 'register', 'home'].includes(item.key) ? false : item.disabled
    )
    .map((item) => item.key);

  const fetchPizzas = async () => {
    const pizzas = await getPizzas();
    const updatedPizzas = pizzas.map((pizza) => { // Pizzas es sobreescrito por la data que trae la api
      pizza.total = pizza.price;
      pizza.quantity = 1;
      return pizza;
    });
    setPizzas(updatedPizzas);
    toast.success(PIZZA_LIST_UPDATED, {
      position: 'top-right'
    });
  };

  useEffect(() => {
    fetchPizzas();
  }, []);

  return (
    <>
      <Navbar
        disabledButtons={disabledButtons}
        items={navbarItems}
        token={false} // La capa de UI no manejará el token, sino que llegará desde otra ubicación AUTH
        total={totalPrice}
        cartOpen={cartOpen}
      />
      <Home
        pizzas={pizzas}
        pizzaList={pizzaList}
        setPizzaList={setPizzaList}
        setTotalPrice={setTotalPrice}
      />
      <RegisterDialog
        isOpen={registerDialogIsOpen} // Este modal está consruido para ser reusable, Registro y Login
        registry={registry}
        setRegistry={setRegistry}
        onClose={registerDialogClose}
      />
      <CartDialog
        cartIsOpen={cartIsOpen}
        cartClose={cartClose}
        pizzaList={pizzaList}
        setPizzaList={setPizzaList}
        setTotalPrice={setTotalPrice}
        totalPrice={totalPrice}
      />
      <Footer />
    </>
  );
}

export default App;
