import { useDisclosure } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';
import { default as toast } from 'react-hot-toast';
import { CartDialog, Footer, Home, Navbar, PizzaCard } from './components';
import fields from './components/models/Fields';
import { navbarItems } from './components/models/menu';
import pizzaData from './components/models/pizzas';
import RegisterDialog from './components/RegisterDialog';
import { getPizzas, getPizza } from './service/fetchPizzas';

function App() {
  const [registry, setRegistry] = useState(false);
  const [pizza, setPizza] = useState(null);
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

    const individualPizza = await getPizza('p001'); // Para traer una sola pizza
    const updatedPizza = individualPizza;
    setPizza(updatedPizza);
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
        token={false} 
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

      
      {pizza && (
        <PizzaCard
          key={pizza.id}
          name={pizza.name}
          price={pizza.price}
          ingredients={pizza.ingredients} // Componente pizza renderizado individualmente
          img={pizza.img}
          desc={pizza.desc}
          id={pizza.id}
          setPizzaList={setPizzaList}
          pizzaList={pizzaList}
          setTotalPrice={setTotalPrice}
          pizzas={pizzas}
        ></PizzaCard>
      )}
      <Footer />
    </>
  );
}

export default App;
