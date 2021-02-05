import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import routesServices from '../../services/routesServices';
import './style.css';
import logoImg from '../../assets/logo.png';
import { useForm } from 'react-hook-form';
import Spinner from '../../components/Spinner';
import { yupResolver } from '@hookform/resolvers/yup';
import schemaValidation from './validationForm';

export default function Register() {
  const initialUserState = {
    name: '',
    email: '',
    password: '',
    confirmpassword: '',
    country: '',
  };
  const { register, handleSubmit, errors, clearErrors } = useForm({
    resolver: yupResolver(schemaValidation),
  });
  const [registerUser, setRegisterUser] = useState(initialUserState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRegisterUser({ ...registerUser, [name]: value });
  };

  function handleFormSubmit() {
    saveRegister();
    setTimeout(() => {
      newRegister();
    }, 5000);
  }

  const saveRegister = () => {
    var data = {
      name: registerUser.name,
      email: registerUser.email,
      password: registerUser.password,
      confirmpassword: registerUser.confirmpassword,
      country: registerUser.country,
    };
    routesServices
      .create(data)
      .then((res) => {
        setRegisterUser({
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
    setRegisterUser(initialUserState);
    setSubmitted(false);
  };

  return (
    <div className="register-container">
      {submitted ? (
        <Spinner description="Enviando dados..." />
      ) : (
        <div className="content">
          <section>
            <img src={logoImg} className="logo-image" alt="logo" />
            <h1>Faça seu cadastro</h1>
          </section>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <input
              id="name"
              name="name"
              placeholder="Nome"
              value={registerUser.name}
              onChange={handleInputChange}
              ref={register}
            />
            <div className="input-group" style={{ color: 'red' }}>
              {errors.name?.message}
            </div>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="E-mail"
              value={registerUser.email}
              onChange={handleInputChange}
              ref={register}
            />
            <div className="input-group" style={{ color: 'red' }}>
              {errors.email?.message}
            </div>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Senha"
              value={registerUser.password}
              onChange={handleInputChange}
              ref={register}
            />
            <div className="input-group" style={{ color: 'red' }}>
              {errors.password?.message}
            </div>

            <input
              id="confirmpassword"
              type="password"
              name="confirmpassword"
              placeholder="Confirme sua senha"
              value={registerUser.confirmpassword}
              onChange={handleInputChange}
              ref={register}
            />
            <div className="input-group" style={{ color: 'red' }}>
              {errors.confirmpassword?.message}
            </div>
            <div className="input-group">
              <input
                id="country"
                name="country"
                placeholder="País"
                value={registerUser.country}
                onChange={handleInputChange}
                ref={register}
              />
            </div>
            <div className="input-group" style={{ color: 'red' }}>
              {errors.country?.message}
            </div>

            <button
              className="waves-effect waves-light btn-small green darken-2"
              type="submit"
              onClick={() => clearErrors()}
              disabled={
                registerUser.country.length === 0 ||
                registerUser.name.length === 0 ||
                registerUser.email.length === 0 ||
                registerUser.password.length === 0
              }
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
