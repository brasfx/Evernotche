import React, { useState } from 'react';
import Modal from 'react-modal';
import ButtonClose from './ButtonClose';
import './style.css';

Modal.setAppElement('#root');

export default function ContainerModal(props) {
  const { handleModalClose, type, handleFormSubmitDelete } = props;

  const setModalClose = () => {
    handleModalClose(true);
  };

  const modalTitle =
    type == 'note'
      ? 'Deseja realmente excluir sua nota?'
      : type == 'account'
      ? ' Deseja realmente excluir sua conta?'
      : 'Sua nota será excluida definitivamente, deseja continuar?';

  return (
    <div>
      <Modal isOpen={true} className="modal">
        <div className="header">
          <h2 className="title"></h2>
          <ButtonClose setModalClose={setModalClose} icon="close" />
        </div>
        <h3 className="title"> {modalTitle} </h3>
        <div className="div-buttons">
          <button
            className="button-modal"
            type="submit"
            onClick={handleFormSubmitDelete}
            className="waves-effect waves-light btn-small green darken-2"
          >
            Sim
          </button>
          <button
            className="button-modal"
            type="submit"
            onClick={handleModalClose}
            className="waves-effect waves-light btn-small red darken-4"
          >
            Não
          </button>
        </div>
      </Modal>
    </div>
  );
}
