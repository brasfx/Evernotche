import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import routesServices from '../../services/routesServices';
import './style.css';
import logoImg from '../../assets/logo.png';

export default function Register() {
  const initialUserState = {
    name: '',
    email: '',
    password: '',
    country: '',
  };
  const [register, setRegister] = useState(initialUserState);
  const [submitted, setSubmitted] = useState(false);

  /*const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [country, setCountry] = useState('');*/

  const handleInputChange = (event) => {
    const { name, email, password, country } = event.target.value;
    setRegister({ ...register, [name]: email });
  };

  /*async function handleRegister(e) {
    e.preventDefault();
  }*/

  const saveRegister = () => {
    var data = {
      name: register.name,
      email: register.email,
      password: register.password,
      country: register.country,
    };
    routesServices
      .create(data)
      .then((res) => {
        setRegister({
          name: res.data.name,
          email: res.data.email,
          password: res.data.password,
          country: res.data.country,
        });
        setSubmitted(true);
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} className="logo-image" alt="logo" />
          <h1>Faça seu cadastro</h1>
        </section>
        <form>
          <input
            id="name"
            placeholder="Nome"
            value={register.name}
            onChange={handleInputChange}
          />
          <input
            id="email"
            type="email"
            placeholder="E-mail"
            value={register.email}
            onChange={handleInputChange}
          />
          <input
            id="password"
            type="password"
            placeholder="Senha"
            value={register.password}
            onChange={handleInputChange}
          />

          <div className="input-group">
            <input
              id="country"
              placeholder="País"
              value={register.country}
              onChange={handleInputChange}
            />
          </div>

          <button
            className="waves-effect waves-light btn-small green darken-2"
            type="submit"
            onClick={saveRegister}
          >
            Cadastrar
          </button>
        </form>
        <Link className="back-link" to="/">
          <button
            className="button-back waves-effect waves-light btn-small "
            type="submit"
          >
            Voltar
          </button>
        </Link>
      </div>
    </div>
  );
}
