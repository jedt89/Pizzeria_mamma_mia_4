import { default as axios } from 'axios';

const URL_BASE = 'http://localhost:5000/api/pizzas';

export const getPizzas = async () => {
  try {
    const response = await axios.get(URL_BASE);
    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
