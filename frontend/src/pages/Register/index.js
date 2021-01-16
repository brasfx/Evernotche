import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import logoImg from '../../assets/logo.png';
export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');

  async function handleRegister(e) {
    e.preventDefault();
  }
  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} className="logo-image" />
          <h1>Faça seu cadastro</h1>
        </section>
        <form onSubmit={handleRegister}>
          <input
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Repetir senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="input-group">
            <input
              placeholder="País"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <Link className="back-link" to="/">
            <button
              className="waves-effect waves-light btn-small green darken-2"
              type="submit"
            >
              Cadastrar
            </button>
          </Link>
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
