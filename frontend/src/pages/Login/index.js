import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import routesServices from '../../services/routesServices';
//import { history } from '../../history';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
//import schemaValidation from '../Login/validateLogin';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';

import './style.css';
import 'react-toastify/dist/ReactToastify.css';
import provisionalImg from '../../assets/slogan.png';
import logoImg from '../../assets/logo_sem_fundo.png';
import us from '../../assets/eng.png';
import br from '../../assets/ptbr.png';

import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

export default function Login() {
  const { t } = useTranslation();

  //Schema validation moved to login function
  const schemaValidation = yup.object().shape({
    email: yup
      .string(t('require_email_message'))
      .email(t('required_valid_email_message'))
      .required(t('required_field_message')),
    password: yup.string().required(t('required_field_message')),
  });

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

  const changeLanguage = () => {
    if (i18next.language == 'en') {
      i18next.changeLanguage('pt');
    } else {
      i18next.changeLanguage('en');
    }
  };

  const handleLoginSubmit = () => {
    setTimeout(() => {
      loginAccount();
    }, 2000);
  };

  const notify = () => toast.error(t('wrong_user_or_password'));

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
          notify();
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
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: '35%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'right',
          padding: '10px',
        }}
      >
        <label style={{ color: 'black' }}>{t('change_language')}</label>
        <button
          onClick={changeLanguage}
          className="waves-effect waves-light btn-large"
          style={{
            backgroundColor: '#FFFFFF',
            textAlign: 'center',
            marginTop: '10px',
          }}
        >
          {i18next.language == 'en' ? (
            <img src={br} style={{ width: '50px', alignItems: 'center' }} />
          ) : (
            <img src={us} style={{ width: '50px' }} />
          )}
        </button>
      </div>

      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
          <h1>{t('login_message')}</h1>
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
            placeholder={t('password_placeholder')}
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
            {t('login_button')}
          </button>
        </form>
        <div className="resendRegister">
          <Link className="back-link" to="/register">
            {t('not_registered')}
          </Link>
          <Link className="back-link" to="/recover-password">
            {t('recover_password')}
          </Link>
        </div>
      </motion.section>
    </motion.div>
  );
}
