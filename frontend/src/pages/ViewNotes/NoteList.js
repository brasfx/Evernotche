import React, {useContext} from 'react';
import NotesContext from './context.js';
import Note from './Note.js';

export default function NoteList() {
    const {state} = useContext(NotesContext);

    return (
        <div className="notes-container">
            {state.notes.map((note, i) => {
                return <Note note = {note} key = {i} />
            })}
            
        </div>
    )

}
