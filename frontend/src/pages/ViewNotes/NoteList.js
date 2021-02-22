import React, {useContext} from 'react';
import NotesContext from './context.js';
import Note from './Note.js';
import routesServices from '../../services/routesServices'

export default function NoteList() {
    const {state} = useContext(NotesContext);
    
    
    if (state.deleteNote) {
        console.log("DELETE NOTE");
        console.log(state.currentNote);
        const data = state.currentNote
        routesServices
        .removeNote(data);

    }

    return (
        <div className="notes-container">
            {state.notes.map((note, i) => {
                return <Note note = {note} key = {i} />
            })}
            
        </div>
    )

}
