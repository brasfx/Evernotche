import Navbar from "./Navbar";
import React, { useContext, useReducer, useEffect, useState } from "react";
import notesReducer from "../ViewNotes/reducer.js";
import NoteList from "../ViewNotes/NoteList";
import routesServices from "../../services/routesServices";

export default function Home() {
  const initialState = {};
  const [state, dispatch] = useReducer(notesReducer, initialState);

  function reduceResult(filteredResult) {
    filteredResult = filteredResult.reduce((acc, entry) => {
      const { _id, payload, userid, title, color } = entry;
      acc[_id] = {
        id: _id,
        title,
        color,
        content: payload,
        owner: userid,
        selected: false,
      };
      return acc;
    }, {});

    return filteredResult;
  }

  useEffect(() => {
    const user = {
      userid: localStorage.getItem("id"),
    };

    routesServices.findNotesLimited(user).then((result) => {
      let filteredResult = result.data;

      const notesData = reduceResult(filteredResult);
      //console.log(notesData);

      dispatch({ data: notesData, type: "UPDATE" });
    });
  }, []);

  return (
    <div>
      <Navbar />
      <NoteList notes={state} dispatch={dispatch} />
    </div>
  );
}
