import React, { useContext } from 'react';
// import NotesContext from './context.js';
import { Link } from 'react-router-dom';

export default function Note({ note, dispatch }) {
    // const { dispatch } = useContext(NotesContext);
    function checkboxStatus(event) {
        dispatch({ type: 'SET_NOTE', id: note.id, data: { ...note, selected: event.target.checked } });


    }

    return (
        <div className="note">
            <div dangerouslySetInnerHTML={{ __html: note.content }} />

            <div className="btn-container">
                <Link to={{ pathname: 'editnote/' + note.id, state: note }}>
                    <button className="edit" >Edit</button>
                </Link>
                <Link to={{ pathname: 'note/' + note.id, state: { notes: note } }}>
                    <button className="view">View</button>
                </Link>
                <button className="delete" onClick={() => dispatch({ type: 'DELETE_NOTE', payload: note })}>Delete</button>


                <label>
                    <input type="checkbox" checked={note.selected} onClick={checkboxStatus} />
                    <span></span>
                </label>
            </div>
        </div>
    )
}