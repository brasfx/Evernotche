import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import routesServices from '../../services/routesServices';
//import { history } from '../../history';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schemaValidation from '../Login/validateLogin';

import './style.css';
import provisionalImg from '../../assets/slogan.png';
import logoImg from '../../assets/logo_sem_fundo.png';

export default function Login() {
  const history = useHistory();
  const userLogin = {
    email: '',
    password: '',
  };
  const [user, setUser] = useState(userLogin);
  const { register, handleSubmit, errors, clearErrors } = useForm({
    resolver: yupResolver(schemaValidation),
  });

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleLoginSubmit = () => {
    setTimeout(() => {
      loginAccount();
    }, 2000);
  };

  const loginAccount = async () => {
    var data = {
      email: user.email,
      password: user.password,
    };
    await routesServices
      .login(data)
      .then((res) => {
        setUser({
          email: res.data.email,
          password: res.data.password,
        });
        if (
          user.email === res.data.email ||
          user.password === res.data.password
        ) {
          localStorage.setItem('app-token', JSON.stringify(res.data));
          localStorage.setItem('id', res.data._id);
          localStorage.setItem('name', res.data.name);
          localStorage.setItem('email', res.data.email);
          history.push('/home');
        }
        if (
          res.data.email === undefined ||
          (res.data.password === undefined &&
            (user.email !== res.data.email ||
              user.password !== res.data.password))
        ) {
          history.push('/');
          console.log('Não foi dessa vez!');
        }
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="login-container">
      <img src={provisionalImg} alt="provisoria" className="slogan-image" />
      <section className="form">
        <img className="logo-image" src={logoImg} alt="logo" />
        <form onSubmit={handleSubmit(handleLoginSubmit)}>
          <h1>Faça seu login</h1>
          <div className="input-group" style={{ color: 'red' }}></div>
          <input
            id="name"
            name="email"
            className="validate"
            placeholder="Email"
            type="email"
            value={user.email}
            onChange={handleLoginChange}
            ref={register}
          />
          <div className="input-group" style={{ color: 'red' }}>
            {errors.email?.message}
          </div>
          <input
            id="password"
            name="password"
            placeholder="Senha"
            type="password"
            value={user.password}
            onChange={handleLoginChange}
            ref={register}
          />
          <div className="input-group" style={{ color: 'red' }}>
            {errors.password?.message}
          </div>
          <button
            type="submit"
            className="waves-effect waves-light btn-small green darken-2"
          >
            Entrar
          </button>
        </form>
        <div className="resendRegister">
          <Link className="back-link" to="/register">
            Não possui cadastro?
          </Link>
          <Link className="back-link" to="/register">
            Recuperar senha
          </Link>
        </div>
      </section>
    </div>
  );
}
