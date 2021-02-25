import React, { useState } from 'react';
import routesServices from '../../services/routesServices';
import './style.css';
import logoSupp from '../../assets/logo-support.png';
import Spinner from '../../components/Spinner';

export default function PageSupp() {
  const initialDataSupp = {
    name: '',
    email: '',
    topic: '',
    textTopic: '',
    //file: '',
  };
  const [dataSupport, setDataSupport] = useState(initialDataSupp);
  const [submitted, setSubmitted] = useState(false);

  const getName = localStorage.getItem('name');
  const getEmail = localStorage.getItem('email');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDataSupport({ ...dataSupport, [name]: value });
  };

  function handleFormSubmit(event) {
    event.preventDefault();
    saveRegister();
    setTimeout(() => {
      newRegister();
    }, 3000);
  }

  const saveRegister = () => {
    var data = {
      name: getName,
      email: getEmail,
      topic: dataSupport.topic,
      textTopic: dataSupport.textTopic,
      //file: dataSupport.file,
    };
    routesServices
      .support(data)
      .then((res) => {
        setDataSupport({
          name: res.data.name,
          email: res.data.email,
          topic: res.data.topic,
          textTopic: res.data.textTopic,
          //file: res.data.file,
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
    <div className="support-container">
      {submitted ? (
        <Spinner description="Enviando formulário..." />
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
              value={getName}
              onChange={handleInputChange}
              disabled
              style={{ color: 'black  ' }}
            />
            <input
              id="email"
              type="email"
              name="email"
              placeholder="E-mail"
              value={getEmail}
              onChange={handleInputChange}
              disabled
              style={{ color: 'black  ' }}
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

            {/* <div className="input-group">
              <input
                type="file"
                id="file"
                name="file"
                value={dataSupport.file}
                onChange={handleInputChange}
              ></input>
            </div> */}

            <button
              className="waves-effect waves-light btn-small green darken-2"
              type="submit"
            >
              Enviar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
