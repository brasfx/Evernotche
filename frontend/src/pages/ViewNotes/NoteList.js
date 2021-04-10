import React, { useContext, useState } from "react";

import Note from "./Note.js";
import routesServices from "../../services/routesServices";
import "./style.css";

export default function NoteList({ notes, dispatch, rows, setColor, color }) {
  return (
    <div
      className="notes-container"
      style={{ gridTemplateColumns: `${rows ? "700px" : "600px 600px 600px"}` }}
    >
      {Object.keys(notes).map((id, i) => {
        const note = notes[id];
        return (
          <Note
            note={note}
            dispatch={dispatch}
            key={i}
            setColor={setColor}
            color={color}
          />
        );
      })}
    </div>
  );
}
