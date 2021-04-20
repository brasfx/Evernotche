import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';
import ButtonClose from './ButtonClose';
import './style.css';
import routesServices from '../../services/routesServices';

Modal.setAppElement('#root');

export default function ContainerModal(props) {
  const { handleModalClose, id_note } = props;

  const history = useHistory();

  const initialData = {
    id: id_note,
    email: ' ',
  };

  const [shareOneNote, setShareOneNote] = useState(initialData);
  const [submitted, setSubmitted] = useState(false);

  const setModalClose = () => {
    handleModalClose(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setShareOneNote({ ...shareOneNote, [name]: value });
  };

  function handleFormShareNote(event) {
    event.preventDefault();
    shareNote();
    setTimeout(() => {
      history.push(`/viewnotes`);
    }, 1000);
  }

  const shareNote = () => {
    var data = {
      id: id_note,
      email: shareOneNote.email,
    };
    routesServices
      .share(data)
      .then((res) => {
        setShareOneNote({
          id: res.data.id,
          email: res.data.email,
        });
        setSubmitted(true);
        console.log(`Email aqui:${res.data.email}`);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const resetShareNote = () => {
    setShareOneNote('');
    setSubmitted(false);
  };

  return (
    <div>
      <Modal isOpen={true} className="modal-share">
        <div className="header">
          <h2 className="title-share"></h2>
          <ButtonClose setModalClose={setModalClose} icon="close" />
        </div>
        <h4 className="title-share">Insira um email</h4>
        <form onSubmit={handleFormShareNote}>
          <div class="input-field col s12">
            <input
              id="email"
              type="email"
              class="validate"
              name="email"
              value={shareOneNote.email}
              onChange={handleInputChange}
            />
            <label for="email">Email</label>
            <span class="helper-text" data-error="" data-success=""></span>
          </div>
          <div className="div-buttons">
            <button
              className="button-modal"
              type="submit"
              className="waves-effect waves-light btn-small green darken-2"
            >
              Enviar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
