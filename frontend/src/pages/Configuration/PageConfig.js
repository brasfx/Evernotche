import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import routesServices from '../../services/routesServices';
import './style.css';
import logoConfig from '../../assets/logo-config.png';
import Spinner from '../../components/Spinner';

export default function PageConfig() {
  const getName = localStorage.getItem('name');
  const getId = localStorage.getItem('id');

  const history = useHistory();

  const initialDataSupp = {
    name: '',
    password: '',
    country: '',
    id: getId,
  };
  const [dataSupport, setDataSupport] = useState(initialDataSupp);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDataSupport({ ...dataSupport, [name]: value });
  };

  function handleFormSubmitName(event) {
    event.preventDefault();
    updateName();
    setTimeout(() => {
      newRegister();
    }, 3000);
  }

  function handleFormSubmitCountry(event) {
    event.preventDefault();
    updateCountry();
    setTimeout(() => {
      newRegister();
    }, 3000);
  }

  function handleFormSubmitPassword(event) {
    event.preventDefault();
    updatePassword();
    setTimeout(() => {
      newRegister();
    }, 3000);
  }

  function handleFormSubmitDelete(event) {
    event.preventDefault();
    deleteAccount();
    setTimeout(() => {
      localStorage.clear();
      history.push('/');
    }, 3000);
  }

  const updateName = () => {
    var data = {
      id: getId,
      name: dataSupport.name,
    };
    routesServices
      .updateRegister(data)
      .then((res) => {
        setDataSupport({
          id: res.data.id,
          name: res.data.name,
        });
        setSubmitted(true);
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateCountry = () => {
    var data = {
      id: getId,
      country: dataSupport.country,
    };
    routesServices
      .updateRegister(data)
      .then((res) => {
        setDataSupport({
          id: res.data.id,
          country: res.data.country,
        });
        setSubmitted(true);
        console.log(`País aqui:${res.data.country}`);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updatePassword = () => {
    var data = {
      id: getId,
      password: dataSupport.password,
    };
    routesServices
      .updateRegister(data)
      .then((res) => {
        setDataSupport({
          id: res.data.id,
          password: res.data.password,
        });
        setSubmitted(true);
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteAccount = () => {
    var data = {
      id: getId,
    };
    routesServices
      .deleteAccount(data)
      .then((res) => {
        setDataSupport({
          id: res.data.id,
        });
        setSubmitted(true);
        console.log(`Id aqui:${res.data.id}`);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newRegister = () => {
    setDataSupport(initialDataSupp);
    setSubmitted(false);
  };
  return (
    <div className="config-container">
      {submitted ? (
        <Spinner description="Enviando formulário..." />
      ) : (
        <div className="content">
          <img src={logoConfig} />
          <h1>Minhas configurações</h1>
          <section>
            <h4>Alterar nome</h4>
            <form onSubmit={handleFormSubmitName}>
              <input
                id="name"
                name="name"
                placeholder="Insira um novo nome"
                value={dataSupport.name}
                onChange={handleInputChange}
              />
              <button
                className="waves-effect waves-light btn-small "
                type="submit"
              >
                Alterar
              </button>
            </form>
          </section>

          <section>
            <h4>Alterar país</h4>

            <form onSubmit={handleFormSubmitCountry}>
              <input
                id="country"
                name="country"
                type="text"
                placeholder="Insira uma novo país"
                value={dataSupport.country}
                onChange={handleInputChange}
              />
              <button
                className="waves-effect waves-light btn-small "
                type="submit"
              >
                Alterar
              </button>
            </form>
          </section>

          <section>
            <h4>Alterar senha</h4>

            <form onSubmit={handleFormSubmitPassword}>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Insira uma nova senha"
                value={dataSupport.password}
                onChange={handleInputChange}
              />
              <button
                className="waves-effect waves-light btn-small "
                type="submit"
              >
                Alterar
              </button>
            </form>
          </section>

          <section>
            <form className="delete" onSubmit={handleFormSubmitDelete}>
              <h4>Excluir minha conta</h4>
              <button
                className="waves-effect waves-light btn-small red darken-4"
                type="submit"
              >
                Excluir
              </button>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}
