import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import routesServices from '../../services/routesServices';
import Spinner from '../../components/Spinner';
import ContainerModal from '../../components/Modal';
import {
  validateName,
  validateCountry,
  validatePassword,
} from './validateChangeConfig';

import us from '../../assets/eng.png';
import br from '../../assets/ptbr.png';
import logoConfig from '../../assets/logo-config.png';

import 'react-toastify/dist/ReactToastify.css';
import './style.css';

export default function PageConfig() {
  const getName = localStorage.getItem('name');
  const getId = localStorage.getItem('id');

  const { t } = useTranslation();

  const changeLanguage = () => {
    if (i18next.language == 'en') {
      i18next.changeLanguage('pt');
    } else {
      i18next.changeLanguage('en');
    }
  };

  const history = useHistory();

  const initialDataSupp = {
    name: '',
    password: '',
    confirmpassword: '',
    country: '',
    id: getId,
  };
  const [dataSupport, setDataSupport] = useState(initialDataSupp);
  const [submitted, setSubmitted] = useState(false);
  const [description, setDescription] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register: registerName,
    handleSubmit: handleSubmitName,
    errors: errorsName,
  } = useForm({
    resolver: yupResolver(validateName),
  });

  const {
    register: registerPass,
    handleSubmit: handleSubmitPass,
    errors: errorsPass,
  } = useForm({
    resolver: yupResolver(validatePassword),
  });

  const {
    register: registerCountry,
    handleSubmit: handleSubmitCountry,
    errors: errorsCountry,
  } = useForm({
    resolver: yupResolver(validateCountry),
  });

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

  const changeName = () => toast.success(t('name_changed_successfully'));

  const changePassword = () =>
    toast.success(t('password_changed_successfully'));

  const changeCountry = () => toast.success(t('country_changed_successfully'));

  function handleFormSubmitName() {
    updateName();
    setTimeout(() => {
      changeName();
      newRegister();
    }, 3000);
  }

  function handleFormSubmitCountry() {
    updateCountry();
    setTimeout(() => {
      changeCountry();
      newRegister();
    }, 3000);
  }

  function handleFormSubmitPassword() {
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
        setDescription(t('changing_name'));
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
        setDescription(t('changing_country'));
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
        setDescription(t('changing_password'));
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
        setDescription(t('deleting_account'));
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
          <h1>{t('my_settings')}</h1>
          <section>
            <h4>{t('change_name_message')}</h4>
            <form onSubmit={handleSubmitName(handleFormSubmitName)}>
              <input
                id="name"
                name="name"
                type="text"
                placeholder={t('enter_new_name')}
                value={dataSupport.name}
                onChange={handleInputChange}
                ref={registerName}
              />

              <button
                style={{ zIndex: 0 }}
                className="waves-effect waves-light btn-small "
                type="submit"
              >
                {t('confirm')}
              </button>
            </form>
            <div className="error-message">{errorsName.name?.message}</div>
          </section>

          <section>
            <h4>{t('change_country_message')}</h4>

            <form onSubmit={handleSubmitCountry(handleFormSubmitCountry)}>
              <input
                id="country"
                name="country"
                type="text"
                placeholder={t('enter_new_country')}
                value={dataSupport.country}
                onChange={handleInputChange}
                ref={registerCountry}
              />

              <button
                style={{ zIndex: 0 }}
                className="waves-effect waves-light btn-small "
                type="submit"
              >
                {t('confirm')}
              </button>
            </form>
            <div className="error-message">
              {errorsCountry.country?.message}
            </div>
          </section>

          <section style={{ display: 'flex', flexDirection: 'column' }}>
            <h4>{t('change_password_message')}</h4>

            <form onSubmit={handleSubmitPass(handleFormSubmitPassword)}>
              <input
                id="password"
                name="password"
                type="password"
                placeholder={t('enter_new_password')}
                value={dataSupport.password}
                onChange={handleInputChange}
                ref={registerPass}
              />

              <button
                style={{ zIndex: 0 }}
                className="waves-effect waves-light btn-small"
                type="submit"
              >
                {t('confirm')}
              </button>
            </form>
            <input
              style={{ width: '230px' }}
              id="confirmpassword"
              type="password"
              name="confirmpassword"
              placeholder={t('confirm_password_command')}
              value={dataSupport.confirmpassword}
              onChange={handleInputChange}
              ref={registerPass}
            />
            <div className="error-message">{errorsPass.password?.message}</div>
            <div className="error-message">
              {errorsPass.confirmpassword?.message}
            </div>
          </section>

          <section className="delete">
            <h4>{t('delete_account')}</h4>
            <button
              className="waves-effect waves-light btn-small red darken-4"
              onClick={handleModalOpen}
            >
              {t('delete')}
            </button>
          </section>
          <section className="delete">
            <h4>{t('change_language')}</h4>
            <button
              onClick={changeLanguage}
              className="waves-effect waves-light btn-small"
              style={{
                backgroundColor: '#FFFFFF',
                textAlign: 'center',
                marginTop: '10px',
                height: '35px',
              }}
            >
              {i18next.language == 'en' ? (
                <img src={br} style={{ width: '35px' }} />
              ) : (
                <img src={us} style={{ width: '35px' }} />
              )}
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
