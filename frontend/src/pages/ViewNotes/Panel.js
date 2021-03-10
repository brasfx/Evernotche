import React, { useContext, useReducer } from 'react';
//import NotesContext from './context.js';
import './style.css';

export default function Panel({ notes, dispatch }) {
  /*const {state} = useContext(NotesContext);
    const {dispatch} = useContext(NotesContext);*/

  const selectedNotes = [];
  function setSelect(note, selected) {
    dispatch({ type: 'SET_NOTE', id: note.id, data: { ...note, selected } });
  }
  return (
    <div className="panel-container">
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

            console.log(selectedNotes);
          }
        }}
      >
        Checar notas selecionadas
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
        Selecionar todas as notas
      </button>
    </div>
  );
}
