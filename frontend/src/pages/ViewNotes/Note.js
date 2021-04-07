import React, { useContext } from 'react';
// import NotesContext from './context.js';
import { Link } from 'react-router-dom';
import './style.css';

export default function Note({ note, dispatch }) {
  // const { dispatch } = useContext(NotesContext);
  function checkboxStatus(event) {
    dispatch({
      type: 'SET_NOTE',
      id: note.id,
      data: { ...note, selected: event.target.checked },
    });
  }

  const randomColor = () => {
    const hex = ((Math.random() * 0xffffff) << 0).toString(16);
    return `#${hex}`;
  };

  const color = randomColor();

  return (

    <div className="note" style={{ background: `${color}` }}>

      <div className="title-container">{note.title}</div>
      <div className="txt-container" dangerouslySetInnerHTML={{ __html: note.content }} />
      <div className="btn-container">
        <Link to={{ pathname: 'editnote/' + note.id, state: note }}>
          <button className="edit, waves-effect waves-light btn-small green darken-2 ">
            Editar
          </button>
        </Link>
        <Link to={{ pathname: 'note/' + note.id, state: { notes: note } }}>
          <button className="view, waves-effect waves-light btn-small">
            Visualizar
          </button>
        </Link>
        <button
          className="delete, waves-effect waves-light btn-small red darken-4"
          onClick={() => dispatch({ type: 'DELETE_NOTE', payload: note })}
        >
          Excluir
        </button>

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
    </div>
  );
}
