import axios from 'axios';

//Define a URL base da origem para consumo do servico
export default axios.create({
  baseURL: ` ${process.env.REACT_APP_BACKEND}`,
  headers: {
    'Content-type': 'application/json',
  },
});

console.log(`Conectado ao DB ${process.env.REACT_APP_BACKEND}`);
