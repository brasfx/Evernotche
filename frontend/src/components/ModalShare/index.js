import React from 'react';
import Modal from 'react-modal';
import ButtonClose from './ButtonClose';
import './style.css';

Modal.setAppElement('#root');

export default function ContainerModal(props) {
  const { handleModalClose, handleFormShare } = props;

  const setModalClose = () => {
    handleModalClose(true);
  };

  return (
    <div>
      <Modal isOpen={true} className="modal-share">
        <div className="header">
          <h2 className="title-share"></h2>
          <ButtonClose setModalClose={setModalClose} icon="close" />
        </div>
        <h4 className="title-share">Insira um email</h4>
        <div class="input-field col s12">
          <input id="email" type="email" class="validate" />
          <label for="email">Email</label>
          <span class="helper-text" data-error="" data-success=""></span>
        </div>
        <div className="div-buttons">
          <button
            className="button-modal"
            type="submit"
            onClick={handleFormShare}
            className="waves-effect waves-light btn-small green darken-2"
          >
            Enviar
          </button>
        </div>
      </Modal>
    </div>
  );
}
