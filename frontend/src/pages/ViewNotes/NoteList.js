import React, {useContext} from 'react';
import NotesContext from './context.js';
import Note from './Note.js';
import routesServices from '../../services/routesServices'

export default function NoteList() {
    const {state} = useContext(NotesContext);
    
    
    if (state.deleteNote) {
        console.log("DELETE NOTE");
        console.log(state.currentNote);
        //routesServices.removeNote(state.currentNote.id);
        const data = state.currentNote
        routesServices
        .removeNote(data)
        /*.then((res) => {
          setNote({
            id: res.data.id,
          });*/
      /*  })
        .catch((e) => {
          console.log(e);
        })*/;

    }

    return (
        <div className="notes-container">
            {state.notes.map((note, i) => {
                return <Note note = {note} key = {i} />
            })}
            
        </div>
    )

}
