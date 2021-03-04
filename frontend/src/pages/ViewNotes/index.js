import React, { useContext, useReducer, useEffect } from 'react';
import Navbar from '../Home/Navbar.js';

import notesReducer from './reducer.js';
import NoteList from './NoteList.js';
import Panel from './Panel.js';
import routesServices from '../../services/routesServices'



export default function ViewNotes() {

  const initialState = {};
  const [state, dispatch] = useReducer(notesReducer, initialState);


  useEffect(() => {
    const user = {
      userid: localStorage.getItem('id')
    };
    routesServices.findNote(user).then(function (result) {
      console.log(result);
      const notesData = result.data.reduce((acc, entry) => {
        const { _id, payload, userid, timestamp, title } = entry;
        acc[_id] = { id: _id, title, content: payload, owner: userid, timestamp, selected: false };
        return acc;
      }, {})

      dispatch({ data: notesData, type: "UPDATE" });
    });
  }, []);



  return (
    <div>
      <Navbar />
      <Panel notes={state} dispatch={dispatch} />
      <NoteList notes={state} dispatch={dispatch} />
    </div>

  );
}
