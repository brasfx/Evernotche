import React, { useContext, useReducer, useState, useEffect } from 'react';
//import NotesContext from './context.js';
import './style.css';
import ContainerModal from '../../components/Modal';
import { useTranslation } from 'react-i18next';
import * as FaIcons from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import routesServices from "../../services/routesServices";

export default function Panel({ notes, dispatch, cngRows, setSearchQuery }) {
  /*const {state} = useContext(NotesContext);
    const {dispatch} = useContext(NotesContext);*/
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notestoDelete, setNotestoDelete] = useState([]);
  const history = useHistory();
  const selectedNotes = [];
  function setSelect(note, selected) {
    dispatch({ type: 'SET_NOTE', id: note.id, data: { ...note, selected } });
  }
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const deleteNote = () => {
    console.log(notestoDelete);
    const noteTemplate = {
      userid: localStorage.getItem("id"),
      noteid: "",
    };
    notestoDelete.forEach((item) => {
      noteTemplate.noteid = item;
      routesServices.sendTrash(noteTemplate);
    });
    // dispatch({ type: 'SEND_TRASH_BULK', payload: notestoDelete });
    setTimeout(() => {
      history.push('/home');
      history.push('/viewnotes');
    }, 1000);
  };
  return (
    <div className="panel-container">
      <div style={{ position: 'relative' }}>
        <FaIcons.FaSearch
          style={{ position: 'absolute', bottom: 65, left: -20 }}
        />
        <input
          type="text"
          onChange={(event) => setSearchQuery(event.target.value)}
          style={{ maxWidth: '600px' }}
        />
      </div>
      <button
        className="button-panel waves-effect waves-light btn-large grey darken-2"
        onClick={() => {
          {
            Object.keys(notes).map((id, i) => {
              const note = notes[id];
              if (note.selected && !selectedNotes.includes(note.id)) {
                selectedNotes.push(note.id);
              } else if (!note.selected && selectedNotes.includes(note.id)) {
                selectedNotes = selectedNotes.filter(
                  (item) => item !== note.id
                );
              }
            });




            setNotestoDelete(selectedNotes);

            handleModalOpen();
          }
        }}
      >
        {t('check_notes')}
      </button>

      <button
        className="button-panel waves-effect waves-light btn-large grey darken-2"
        onClick={() => {
          let counter = 0;

          Object.keys(notes).map((id, i) => {
            const note = notes[id];
            if (note.selected) {
              counter++;
            }
          });

          if (counter === Object.keys(notes).length || counter === 0) {
            Object.keys(notes).map((id, i) => {
              const note = notes[id];
              setSelect(note, !note.selected);
            });
          } else {
            Object.keys(notes).map((id, i) => {
              const note = notes[id];
              setSelect(note, true);
            });
          }
        }}
      >
        {t('select_all_notes')}
      </button>
      <button
        className="button-panel waves-effect waves-light btn-large grey darken-2"
        onClick={cngRows}
      >
        {t('change_layout')}
      </button>
      {isModalOpen && (
        <ContainerModal
          type={'confirm_multiple'}
          handleModalClose={handleModalClose}
          handleFormSubmitDelete={deleteNote}
        />
      )}
    </div>
  );
}
