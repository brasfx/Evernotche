import React, { useContext, useState } from "react";

import Note from "./Note.js";
import routesServices from "../../services/routesServices";
import "../ViewNotes/style.css";

export default function NoteList({ notes, dispatch, rows }) {
  return (
    <div
      className="notes-container"
      style={{ gridTemplateColumns: `${rows ? "50%" : " 40%  40%"}` }}
    >
      {Object.keys(notes).map((id, i) => {
        const note = notes[id];
        return <Note note={note} dispatch={dispatch} key={i} />;
      })}
    </div>
  );
}
