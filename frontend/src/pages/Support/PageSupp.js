import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import routesServices from '../../services/routesServices';
import './style.css';
import logoSupp from '../../assets/logo-support.png';
import axios from 'axios';
import Spinner from '../../components/Spinner';

export default function PageSupp() {
  const initialDataSupp = {
    name: '',
    email: '',
    topic: '',
    textTopic: '',
    sendFile: '',
  };
  const [dataSupport, setDataSupport] = useState(initialDataSupp);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDataSupport({ ...dataSupport, [name]: value });
  };

  function handleFormSubmit(event) {
    event.preventDefault();
    setTimeout(() => {
      newRegister();
    }, 5000);
  }

  const saveRegister = () => {
    var data = {
      name: dataSupport.name,
      email: dataSupport.email,
      topic: dataSupport.topic,
      textTopic: dataSupport.textTopic,
      sendFile: dataSupport.sendFile,
    };
    routesServices
      .create(data)
      .then((res) => {
        setDataSupport({
          name: res.data.name,
          email: res.data.email,
          topic: res.data.topic,
          textTopic: res.data.textTopic,
          sendFile: res.data.sendFile,
        });
        setSubmitted(true);
        console.log(res.data);
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
    <div className="register-container">
      {submitted && <Spinner description="Enviando form" />}
      {submitted ? (
        <div className="content">
          <section>
            <img src={logoSupp} className="logo-image" alt="logo-supp" />
            <h1>Formulário enviado com sucesso!</h1>
          </section>
          <button
            className="waves-effect waves-light btn-small green darken-2"
            onClick={newRegister}
          >
            Nova solicitação
          </button>
        </div>
      ) : (
        <div className="content">
          <section>
            <img src={logoSupp} className="logo-image" alt="logo-supp" />
            <h1>Formulário de suporte </h1>
          </section>
          <form onSubmit={handleFormSubmit}>
            <input
              id="name"
              name="name"
              placeholder="Nome"
              value={dataSupport.name}
              onChange={handleInputChange}
            />
            <input
              id="email"
              type="email"
              name="email"
              placeholder="E-mail"
              value={dataSupport.email}
              onChange={handleInputChange}
            />
            <input
              id="topic"
              type="text"
              name="topic"
              placeholder="Assunto"
              value={dataSupport.topic}
              onChange={handleInputChange}
            />

            <div className="input-group">
              <textarea
                className="materialize-textarea"
                type="text"
                id="textTopic"
                name="textTopic"
                placeholder="Escreva um pouco sobre seu problema"
                value={dataSupport.textTopic}
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="input-group">
              <input
                type="file"
                id="sendFile"
                name="sendFile"
                value={dataSupport.sendFile}
                onChange={handleInputChange}
              ></input>
            </div>

            <button
              className="waves-effect waves-light btn-small green darken-2"
              type="submit"
              onClick={saveRegister}
            >
              Enviar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
