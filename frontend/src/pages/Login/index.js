import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import provisionalImg from '../../assets/slogan.png';
import logoImg from '../../assets/logo_sem_fundo.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
  }
  return (
    <div className="login-container">
      <img src={provisionalImg} alt="provisoria" className="slogan-image" />
      <section className="form">
        <img className="logo-image" src={logoImg} />
        <form onSubmit={handleLogin}>
          <h1>Faça seu login</h1>
          <input
            className="validate"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to="/home">
            <button
              type="submit"
              className="waves-effect waves-light btn-small green darken-2"
            >
              Entrar
            </button>
          </Link>
        </form>

        <Link className="back-link" to="/register">
          Não possui cadastro?
        </Link>
      </section>
    </div>
  );
}
