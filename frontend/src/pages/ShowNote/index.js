import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './style.css';
import { useTranslation } from 'react-i18next';
import Modal from '../../components/ModalShare';

export default function ShowNote() {
  const { state } = useLocation();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const shareNote = () => {};

  return (
    <div className="container">
      <section className="text">
        <div dangerouslySetInnerHTML={{ __html: state.notes.content }} />
      </section>

      <section className="buttons">
        <Link
          to={{
            pathname: '/editnote/' + state.notes.id,
          }}
        >
          <button
            className="edit, waves-effect waves-light btn-small green darken-2 "
            style={{ zIndex: 0 }}
          >
            {t('edit')}
          </button>
        </Link>

        <Link to="/viewnotes">
          <button
            className="btn waves-effect waves-light btn-small "
            style={{ zIndex: 0 }}
          >
            {t('back')}
          </button>
        </Link>

        <button
          className="btn waves-effect waves-light btn-small yellow darken-4 "
          style={{ zIndex: 0 }}
          onClick={handleModalOpen}
        >
          {t('share')}
        </button>
        {isModalOpen && (
          <Modal
            handleModalClose={handleModalClose}
            handleFormShare={shareNote}
          />
        )}
      </section>
    </div>
  );
}
