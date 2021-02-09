import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import routesServices from '../../services/routesServices';
import './style.css';
import logoImg from '../../assets/logo.png';
import axios from 'axios';

export default function Register() {
  const initialUserState = {
    name: '',
    email: '',
    password: '',
    country: '',
  };
  const [register, setRegister] = useState(initialUserState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRegister({ ...register, [name]: value });
  };

  function handleFormSubmit(event) {
    event.preventDefault();
  }

  const saveRegister = () => {
    var data = {
      name: register.name,
      email: register.email,
      password: register.password,
      country: register.country,
    };
    var type = 1;
    routesServices
      .create(data, type)
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

  const newRegister = () => {
    setRegister(initialUserState);
    setSubmitted(false);
  };
  return (
    <div className="register-container">
      {submitted ? (
        <div className="content">
          <section>
            <img src={logoImg} className="logo-image" alt="logo" />
            <h1>Cadastro realizado com sucesso!</h1>
          </section>
          <button
            className="waves-effect waves-light btn-small green darken-2"
            onClick={newRegister}
          >
            Novo cadastro
          </button>
          <Link className="back-link" to="/">
            <button
              className="button-back waves-effect waves-light btn-small "
              type="submit"
            >
              Página inicial
            </button>
          </Link>
        </div>
      ) : (
        <div className="content">
          <section>
            <img src={logoImg} className="logo-image" alt="logo" />
            <h1>Faça seu cadastro</h1>
          </section>
          <form onSubmit={handleFormSubmit}>
            <input
              id="name"
              name="name"
              placeholder="Nome"
              value={register.name}
              onChange={handleInputChange}
            />
            <input
              id="email"
              type="email"
              name="email"
              placeholder="E-mail"
              value={register.email}
              onChange={handleInputChange}
            />
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Senha"
              value={register.password}
              onChange={handleInputChange}
            />

            <div className="input-group">
              <input
                id="country"
                name="country"
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
      )}
    </div>
  );
}
