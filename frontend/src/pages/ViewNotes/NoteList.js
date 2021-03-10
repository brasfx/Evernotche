import React, { useContext } from 'react';

import Note from './Note.js';
import routesServices from '../../services/routesServices';
import './style.css';

export default function NoteList({ notes, dispatch }) {
  return (
    <div className="notes-container">
      {Object.keys(notes).map((id, i) => {
        const note = notes[id];
        return <Note note={note} dispatch={dispatch} key={i} />;
      })}
    </div>
  );
}
