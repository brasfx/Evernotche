import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-select';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

import routesServices from '../../services/routesServices';
import Spinner from '../../components/Spinner';
import schemaValidation from './validateForm';
import logoImg from '../../assets/logo.png';
import todosPaises from './allcountries_pt.json';
import allCountries from './allcountries_en.json';

import 'react-toastify/dist/ReactToastify.css';
import './style.css';

export default function Register() {
  const { t } = useTranslation();

  const selectStyles = {
    container: (provided) => ({
      ...provided,
      width: '100%',
      zIndex: 1000,
    }),
    indicatorSeparator: (provided) => ({ ...provided, display: 'none' }),
  };

  let countriesJson = '';

  if (i18next.language === 'pt') countriesJson = todosPaises;
  if (i18next.language === 'en') countriesJson = allCountries;

  const options = countriesJson.map((item) => ({
    value: item.name,
    label: item.name,
  }));

  const history = useHistory();
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

  const errorEmail = () => toast.error(t('email_already_registered'));

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRegisterUser({ ...registerUser, [name]: value });
  };
  const handleCountrySelectChange = (value) => {
    setRegisterUser({ ...registerUser, country: value.value });
  };

  function handleFormSubmit() {
    saveRegister();
    setTimeout(() => {
      history.push('/');
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
      })
      .catch((error) => {
        console.log(error);
        if (error) {
          errorEmail();
        }
      });
  };

  return (
    <motion.div
      className="register-container"
      transition={{ delay: 0, duration: 0.7 }}
      variants={{
        show: { opacity: 1, z: '0' },
        hiden: { opacity: 0, z: '100%' },
      }}
      initial="hiden"
      animate="show"
    >
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {submitted ? (
        <Spinner description={t('registering_message')} />
      ) : (
        <div className="content">
          <section>
            <img src={logoImg} className="logo-image" alt="logo" />
            <h1>{t('register_command_message')}</h1>
          </section>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <input
              id="name"
              name="name"
              placeholder={t('name_placeholder')}
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
              placeholder={t('email')}
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
              placeholder={t('password')}
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
              placeholder={t('confirm_password_command')}
              value={registerUser.confirmpassword}
              onChange={handleInputChange}
              ref={register}
            />
            <div className="input-group" style={{ color: 'red' }}>
              {errors.confirmpassword?.message}
            </div>
            <div className="input-group">
              <Select
                id="country"
                name="country"
                onChange={handleCountrySelectChange}
                options={options}
                styles={selectStyles}
                ref={register}
                placeholder={t('country_selection_message')}
              ></Select>
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
              {t('register')}
            </button>
          </form>
          <Link className="back-link" to="/">
            <button
              className="button-back waves-effect waves-light btn-small "
              type="submit"
            >
              {t('back')}
            </button>
          </Link>
        </div>
      )}
    </motion.div>
  );
}
