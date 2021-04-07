import React, { useContext } from 'react';
// import NotesContext from './context.js';
import { Link } from 'react-router-dom';

export default function Note({ note, dispatch }) {
    // const { dispatch } = useContext(NotesContext);
    function checkboxStatus(event) {
        dispatch({ type: 'SET_NOTE', id: note.id, data: { ...note, selected: event.target.checked } });


    }

    return (
        <div className="note" style={{backgroundColor: "green", marginLeft: '25%', marginTop: '1%', marginRight: '30px', width: "50%", padding: "6px"}}>
            <div>
                <label>
                    <input type="checkbox" checked={note.selected} onClick={checkboxStatus} />
                    <span style={{marginLeft: "0%", marginTop: "0%", width: "2px"}}></span>
                </label>
                <div style={{marginTop: "-4%", marginLeft: "3%", fontSize: "24px"}}>{note.title}</div>

            </div>
            
            <div style={{marginTop: "7%"}}>
                <Link to={{ pathname: 'editnote/' + note.id, state: note }}>
                    <button className="edit" >Edit</button>
                </Link>
                <Link to={{ pathname: 'note/' + note.id, state: { notes: note } }}>
                    <button className="view">View</button>
                </Link>
                {/* <button className="delete" onClick={() => dispatch({ type: 'DELETE_NOTE', payload: note })}>Delete</button> */}
            </div>


            
        </div>
    )
}