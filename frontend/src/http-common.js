import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

//Define a URL base da origem para consumo do servico
export default axios.create({
  baseURL: ` ${process.env.REACT_APP_BACKEND}`,
  headers: {
    'Content-type': 'application/json',
  },
});

console.log(`Conectado ao DB ${process.env.REACT_APP_BACKEND}`);
