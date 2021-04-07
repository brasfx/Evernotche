import React, { useContext, useState, useEffect} from 'react';
// import NotesContext from './context.js';
import { Link } from 'react-router-dom';
import './style.css';
import routesServices from '../../services/routesServices';
import { useLocation, useHistory } from "react-router-dom";

export default function Note({ note, dispatch }) {
  // const { dispatch } = useContext(NotesContext);

  const history = useHistory()

  function checkboxStatus(event) {
    dispatch({
      type: 'SET_NOTE',
      id: note.id,
      data: { ...note, selected: event.target.checked },
    });
  }

  // const randomColor = () => {
  //   const hex = ((Math.random() * 0xffffff) << 0).toString(16);
  //   return `#${hex}`;
  // };

  //Usando timestamp por enquanto, criar um campo de cor na nota
  const setNoteColor = (colorValue) => {
    setColor(colorValue)

    var data = {...note, timestamp: colorValue}

    routesServices
    .updateNote(note.id, data)
    .then((res) => {
      history.push("/viewnotes");
    })
    .catch((e) => {
      console.log(e);
    });

  }

  //const color = randomColor();
  const [color, setColor] = useState('')

  useEffect(() => {
    setColor(note.timestamp)

  }, [])

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

        <input type="color" id="favcolor" name="favcolor" onChange={event => setNoteColor(event.target.value)}></input>

      </div>
    </div>
  );
}
