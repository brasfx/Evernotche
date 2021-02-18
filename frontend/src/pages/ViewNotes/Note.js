import React, {useContext} from 'react';
import NotesContext from './context.js';
import { Link } from 'react-router-dom';

export default function Note({note}) {
    const {dispatch} = useContext(NotesContext);
    
    return (
        <div className="note">
            <p>{note.content}</p>

            <div className="btn-container">
                <button className="edit" onClick={() => dispatch({type: 'SET_CURRENT_NOTE', payload: note})}>Edit</button>
                <Link to={{pathname: 'note/' + note.id, state: {notes: note}}}>
                    <button className="view" onClick={() => dispatch({type: 'SET_CURRENT_NOTE', payload: note})}>View</button>
                </Link>
                
               
                
                <label>
                    <input type="checkbox" onClick={() => { note.selected = !note.selected; }} checked={note.selected} onChange={() => dispatch({type: 'UPDATE'})}/>
                    <span></span>
                </label>
            </div>
        </div>
    )
}