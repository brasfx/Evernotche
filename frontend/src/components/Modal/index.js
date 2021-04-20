import React, { useState } from 'react';
import Modal from 'react-modal';
import ButtonClose from './ButtonClose';
import './style.css';
import { useTranslation } from 'react-i18next';


Modal.setAppElement('#root');

export default function ContainerModal(props) {
  const { t } = useTranslation();

  const { handleModalClose, type, handleFormSubmitDelete } = props;

  const setModalClose = () => {
    handleModalClose(true);
  };

  const modalTitle =
    type == 'note'
      ? t('confirm_note_deletion')
      : type == 'account'
        ? t('confirm_account_deletion')
        : type == 'confirm_multiple'
          ? t('confirm_multiple_deletion') : t('final_confirm_note_deletion')


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
            {t('yes')}
          </button>
          <button
            className="button-modal"
            type="submit"
            onClick={handleModalClose}
            className="waves-effect waves-light btn-small red darken-4"
          >
            {t('no')}
          </button>
        </div>
      </Modal>
    </div>
  );
}
