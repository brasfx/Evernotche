import React, { useState } from 'react';
import routesServices from '../../services/routesServices';
import './style.css';
import logoReset from '../../assets/resetPassword.png';
import Spinner from '../../components/Spinner';
import { Link, useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function RecoverPassword() {
  const history = useHistory();
  const initialData = {
    email: '',
    password: '',
  };
  const [recoverPassword, setRecoverPassword] = useState(initialData);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRecoverPassword({ ...recoverPassword, [name]: value });
  };

  function handleFormSubmit(event) {
    event.preventDefault();
    saveRegister();
    setTimeout(() => {
      history.push('/');
    }, 3000);
  }

  function randomPassword() {
    let pass = '';
    pass += Math.random().toString(36).substr(2);
    pass = pass.substr(0, 10);
    return pass;
  }

  const saveRegister = () => {
    var data = {
      password: randomPassword(),
      email: recoverPassword.email,
    };
    routesServices
      .recover(data)
      .then((res) => {
        setRecoverPassword({
          email: res.data.email,
          password: res.data.password,
        });
        setSubmitted(true);
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newRegister = () => {
    setRecoverPassword(initialData);
    setSubmitted(false);
  };
  return (
    <motion.div
      className="recover-container"
      transition={{ delay: 0, duration: 0.7 }}
      variants={{
        show: { opacity: 1, z: '0' },
        hiden: { opacity: 0, z: '100%' },
      }}
      initial="hiden"
      animate="show"
    >
      {submitted ? (
        <Spinner description="Enviando dados para seu email..." />
      ) : (
        <div className="content">
          <section>
            <img src={logoReset} className="logo-image" alt="logo-supp" />
            <h1>Recuperação de senha</h1>
          </section>
          <form onSubmit={handleFormSubmit}>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Insira seu email de login"
              value={recoverPassword.email}
              onChange={handleInputChange}
            />

            <button
              className="waves-effect waves-light btn-small green darken-2"
              type="submit"
            >
              Enviar
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
    </motion.div>
  );
}
