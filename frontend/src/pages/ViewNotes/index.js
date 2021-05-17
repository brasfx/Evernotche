import React, { useContext, useReducer, useEffect, useState } from "react";
import Navbar from "../Home/Navbar.js";
import notesReducer from "./reducer.js";
import NoteList from "./NoteList.js";
import Panel from "./Panel.js";
import routesServices from "../../services/routesServices";

export default function ViewNotes() {
  const initialState = {};
  const [state, dispatch] = useReducer(notesReducer, initialState);
  const [rows, setRows] = useState(false);
  const [searchQuery, setSearchQuery] = useState();
  const [notesOrder, setNotesOrder] = useState();

  function cngRows() {
    setRows(!rows);
  }

  function filterResult(filteredResult) {
    const upperCaseSearchQuery = searchQuery.toUpperCase();

    filteredResult = filteredResult.filter(
      (e) =>
        e.title.toUpperCase().includes(upperCaseSearchQuery) ||
        e.payload.toUpperCase().includes(upperCaseSearchQuery)
    );

    return filteredResult;
  }

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

    switch (notesOrder) {
      case "newest":

      case "oldest":
      case "A-Z":
      case "Z-A":

      default:
        break;
    }

    routesServices.findNotesLimited(user).then((result) => {
      let filteredResult = result.data;

      if (searchQuery) {
        filteredResult = filterResult(filteredResult);
      }

      const notesData = reduceResult(filteredResult);
      console.log(notesData);

      dispatch({ data: notesData, type: "UPDATE" });
    });
  }, [searchQuery, notesOrder]);

  return (
    <div>
      <Navbar />
      <Panel
        notes={state}
        dispatch={dispatch}
        cngRows={cngRows}
        setSearchQuery={setSearchQuery}
        setNotesOrder={setNotesOrder}
      />
      <NoteList notes={state} dispatch={dispatch} rows={rows} />
    </div>
  );
}
