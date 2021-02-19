import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import routesServices from '../../services/routesServices';
//import { history } from '../../history';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import schemaValidation from '../Login/validateLogin';
import { motion } from 'framer-motion';

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
    <motion.div
      className="login-container"
      transition={{ delay: 0, duration: 0.7 }}
      variants={{
        show: { opacity: 1, z: '0' },
        hiden: { opacity: 0, z: '100%' },
      }}
      initial="hiden"
      animate="show"
    >
      <motion.img
        src={provisionalImg}
        alt="provisoria"
        className="slogan-image"
        transition={{ delay: 0.5, duration: 0.8 }}
        variants={{
          show: { opacity: 1, x: '0' },
          hiden: { opacity: 0, x: '-100%' },
        }}
        initial="hiden"
        animate="show"
      />
      <motion.section
        className="form"
        transition={{ delay: 0.2, duration: 0.5 }}
        variants={{
          show: { opacity: 1, x: '0' },
          hiden: { opacity: 0, x: '100%' },
        }}
        initial="hiden"
        animate="show"
      >
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
          <Link className="back-link" to="/recover-password">
            Recuperar senha
          </Link>
        </div>
      </motion.section>
    </motion.div>
  );
}
