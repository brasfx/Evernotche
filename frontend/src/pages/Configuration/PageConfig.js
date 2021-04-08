import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import routesServices from '../../services/routesServices';
import './style.css';
import logoConfig from '../../assets/logo-config.png';
import Spinner from '../../components/Spinner';
import ContainerModal from '../../components/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [description, setDescription] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDataSupport({ ...dataSupport, [name]: value });
  };

  const changeName = () => toast.success('Nome alterado com sucesso!');
  const changePassword = () => toast.success('Senha alterada com sucesso!');
  const changeCountry = () => toast.success('País alterado com sucesso!');

  function handleFormSubmitName(event) {
    event.preventDefault();
    updateName();
    setTimeout(() => {
      changeName();
      newRegister();
    }, 3000);
  }

  function handleFormSubmitCountry(event) {
    event.preventDefault();
    updateCountry();
    setTimeout(() => {
      changeCountry();
      newRegister();
    }, 3000);
  }

  function handleFormSubmitPassword(event) {
    event.preventDefault();
    updatePassword();
    setTimeout(() => {
      changePassword();
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
        setDescription('Realizando alteração de nome');
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
        setDescription('Realizando alteração de país');
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
        setDescription('Realizando alteração de senha');
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
        setDescription('Excluindo conta de usuário');
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
        <Spinner description={description} />
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
                style={{ zIndex: 0 }}
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
                style={{ zIndex: 0 }}
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
                style={{ zIndex: 0 }}
                className="waves-effect waves-light btn-small"
                type="submit"
              >
                Alterar
              </button>
            </form>
          </section>

          <section className="delete">
            <h4>Excluir minha conta</h4>
            <button
              className="waves-effect waves-light btn-small red darken-4"
              onClick={handleModalOpen}
            >
              Excluir
            </button>
          </section>
          {isModalOpen && (
            <ContainerModal
              type={'account'}
              handleModalClose={handleModalClose}
              handleFormSubmitDelete={handleFormSubmitDelete}
            />
          )}
        </div>
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
