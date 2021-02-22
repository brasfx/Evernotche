import React, {useContext, useReducer, useEffect} from 'react';
import Navbar from '../Home/Navbar.js';
import NotesContext from './context.js';
import notesReducer from './reducer.js'; 
import NoteList from './NoteList.js';
import Panel from './Panel.js';

export default function ViewNotes() {
  const initialState = useContext(NotesContext);
  const [state, dispatch] = useReducer(notesReducer, initialState);

  return (
    <NotesContext.Provider value={{state, dispatch}}>
      <Navbar />
      <Panel />
      <NoteList />
    </NotesContext.Provider>

  );
}
