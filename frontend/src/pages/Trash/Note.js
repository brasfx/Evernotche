import React, { useContext, useState, useEffect } from 'react';
// import NotesContext from './context.js';
import { Link } from 'react-router-dom';
import './style.css';
import routesServices from '../../services/routesServices';
import { useLocation, useHistory } from 'react-router-dom';
import ContainerModal from '../../components/Modal';
import { useTranslation } from 'react-i18next';

export default function Note({ note, dispatch }) {
  // const { dispatch } = useContext(NotesContext);
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const history = useHistory();

  function checkboxStatus(event) {
    dispatch({
      type: 'SET_NOTE',
      id: note.id,
      data: { ...note, selected: event.target.checked },
    });
  }

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const recoverNote = () => {
    dispatch({ type: 'RECOVER', payload: note.id });
    setTimeout(() => {
      history.push('/viewnotes');
      history.push('/trash');
    }, 1000);
  };

  const deleteNote = () => {
    dispatch({ type: 'DELETE_NOTE', payload: note.id });
    setTimeout(() => {
      history.push('/viewnotes');
      history.push('/trash');
    }, 1000);
  };

  return (
    <div
      className="note"
      style={{
        background: note.color,
        position: 'relative',
      }}
    >
      <div
        className="tcheckbox"
        style={{
          display: 'flex',
          alignContent: 'flex-end',
        }}
      >
        <label>
          <input
            type="checkbox"
            className="filled-in"
            checked={note.selected}
            onClick={checkboxStatus}
          />
          <span></span>
        </label>
      </div>
      <div className="title-container">{note.title}</div>
      <div
        className="txt-container"
        style={{ marginBottom: 32 }}
        dangerouslySetInnerHTML={{ __html: note.content }}
      />
      <div
        className="btn-container"
        style={{ bottom: 0, alignItems: 'center' }}
      >
        <Link>
          <button
            className="view, waves-effect waves-light btn-small"
            style={{ zIndex: 0 }}
            onClick={recoverNote}
          >
            {t('recover')}
          </button>
        </Link>
        <button
          style={{ zIndex: 0 }}
          className="delete, waves-effect waves-light btn-small red darken-4"
          onClick={handleModalOpen}
        >
          {t('delete')}
        </button>

        {isModalOpen && (
          <ContainerModal
            type={'trash'}
            handleModalClose={handleModalClose}
            handleFormSubmitDelete={deleteNote}
          />
        )}
      </div>
    </div>
  );
}
