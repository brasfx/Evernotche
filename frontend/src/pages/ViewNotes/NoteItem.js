import React, { useState, useEffect, useReducer } from 'react';
import './noteitem.css';
import NoteSelect from './NoteSelect.js';
import { useSelector } from 'react-redux';

export default function NoteItem(props) {
  const [note, setNote] = useState({
    id: 0,
    content: '',
    owner: '',
    selected: false,
  });

  useEffect(() => {
    setNote((note) => ({
      ...note,
      id: props.noteaux.id,
      content: props.noteaux.content,
      owner: props.noteaux.owner,
    }));
  }, []);

  const selectedAux = useSelector((state) => state.selectnote.selected);
  const idAux = useSelector((state) => state.selectnote.id);
  console.log(note);

  if (note.selected !== selectedAux && idAux === note.id) {
    setNote({ ...note, selected: selectedAux });
  }

  return (
    <div className="noteitem">
      <NoteSelect noteid={note.id}></NoteSelect>
      <label>{note.selected.toString()}</label>
    </div>
  );
}
