import { Button } from '@nextui-org/react';
import { default as toast } from 'react-hot-toast';
import { PiSealCheckDuotone, PiShoppingCart } from 'react-icons/pi';
import { VscSettings } from 'react-icons/vsc';
import pizzaIcon from '../assets/img/pizzaIcon.png';
import fields from './models/Fields';

const PizzaCard = ({
  desc,
  id,
  img,
  ingredients,
  name,
  price,
  setPizzaList,
  pizzaList,
  setTotalPrice,
  pizzas
}) => {
  const { CART_ADDED } = fields;

  const getIngredients = () => (
    <ul className='ingredients'>
      {ingredients.map((ingredient, index) => (
        <li key={index} className='display-flex justify-between'>
          <div className='display-flex'>
            <img
              src={pizzaIcon}
              alt='Pizza ingredient'
              style={{ width: '20px', height: '15px', marginRight: '10px' }}
            />
            <div>{ingredient}</div>
          </div>
          <PiSealCheckDuotone color='limegreen' fontSize={24} />
        </li>
      ))}
    </ul>
  );

  const addToCart = (id) => {
    const pizzaIndex = pizzaList.findIndex((pizza) => pizza.id === id);

    if (pizzaIndex > -1) {
      const updatedPizzaList = pizzaList.map((pizza, index) =>
        index === pizzaIndex
          ? {
              ...pizza,
              quantity: pizza.quantity + 1,
              total: (pizza.quantity + 1) * pizza.price
            }
          : pizza
      );
      const newTotalPrice = updatedPizzaList.reduce(
        (acc, pizza) => acc + pizza.total,
        0
      );
      setPizzaList(updatedPizzaList);
      setTotalPrice(newTotalPrice);
      toast.success(CART_ADDED, {
        position: 'top-right'
      });
    } else {
      const pizzaToAdd = pizzas.find((pizza) => pizza.id === id);
      if (pizzaToAdd) {
        const updatedPizzaList = [
          ...pizzaList,
          { ...pizzaToAdd, quantity: 1, total: pizzaToAdd.price }
        ];
        const newTotalPrice = updatedPizzaList.reduce(
          (acc, pizza) => acc + pizza.total,
          0
        );
        setPizzaList(updatedPizzaList);
        setTotalPrice(newTotalPrice);
        toast.success(CART_ADDED, {
          position: 'top-right'
        });
      }
    }
  };

  return (
    <div className='card justify-center text-center'>
      <div className='display-flex'>
        <img alt='Pizza' src={img} />
      </div>
      <div className='card-content justify-between'>
        <div>
          <h4 className='title'>{name}</h4>
          <p className='subtitle'>{desc}</p>
          {getIngredients()}
        </div>
        <div className='card-footer'>
          <h2>Precio: ${price.toLocaleString('es-CL')}</h2>
          <div className='display-flex buttons-container'>
            <Button
              className='button-card'
              startContent={<VscSettings />}
              variant='light'
            >
              Editar
            </Button>

            <Button
              className='button-card'
              startContent={<PiShoppingCart />}
              variant='light'
              onClick={() => addToCart(id)}
            >
              Añadir
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaCard;
