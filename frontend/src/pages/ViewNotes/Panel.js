import React, {useContext, useReducer} from 'react';
import NotesContext from './context.js';

export default function Panel() {
    const {state} = useContext(NotesContext);
    const {dispatch} = useContext(NotesContext);

    const selectedNotes = [];

    return (
        <div className="panel-container">
            <button onClick={() => {
                {state.notes.map((note, i) => {
                    if (note.selected && !selectedNotes.includes(note.id)) {
                        selectedNotes.push(note.id);

                    } else if (!note.selected && selectedNotes.includes(note.id)) {
                        selectedNotes = selectedNotes.filter(item => item !== note.id)

                    }
                })
            
                console.log(selectedNotes)}
                
            }}>Check selected notes</button>
        
            <button onClick={() => {
                    let counter = 0;
                    {state.notes.map((note, i) => {
                        if (note.selected) {
                            counter++;

                        }
                    })

                    if (counter === state.notes.length || counter === 0) {
                        state.notes.map((note, i) => {
                            note.selected = !note.selected;
                        })
                    } else {
                        state.notes.map((note, i) => {
                            note.selected = true;
                        })
                    }
                
                    dispatch({type: 'UPDATE'})}
                    
                }}>Select/Deselect all notes</button>


        </div>
    )

}