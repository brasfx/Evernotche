import React, { useContext, useReducer, useState, useEffect } from 'react';
//import NotesContext from './context.js';
import './style.css';

import { useTranslation } from 'react-i18next';
import * as FaIcons from 'react-icons/fa';

export default function Panel({ notes, dispatch, cngRows, setSearchQuery }) {
  /*const {state} = useContext(NotesContext);
    const {dispatch} = useContext(NotesContext);*/
  const { t } = useTranslation();

  const selectedNotes = [];
  function setSelect(note, selected) {
    dispatch({ type: 'SET_NOTE', id: note.id, data: { ...note, selected } });
  }
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
        style={{ zIndex: 0 }}
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

            console.log(selectedNotes);
          }
        }}
      >
        {t('check_notes')}
      </button>

      <button
        style={{ zIndex: 0 }}
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
        style={{ zIndex: 0 }}
        className="button-panel waves-effect waves-light btn-large grey darken-2"
        onClick={cngRows}
      >
        {t('change_layout')}
      </button>
    </div>
  );
}
