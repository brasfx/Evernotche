import React, { useContext, useState, useEffect } from "react";
// import NotesContext from './context.js';
import { Link } from "react-router-dom";
import "./style.css";
import routesServices from "../../services/routesServices";
import { useLocation, useHistory } from "react-router-dom";
import ContainerModal from "../../components/Modal";
import { useTranslation } from "react-i18next";

export default function Note({ note, dispatch }) {
  // const { dispatch } = useContext(NotesContext);
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const history = useHistory();

  function checkboxStatus(event) {
    dispatch({
      type: "SET_NOTE",
      id: note.id,
      data: { ...note, selected: event.target.checked },
    });
  }

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const deleteNote = () => {
    //console.log(note.id);
    dispatch({ type: "SEND_TRASH", payload: note.id });
    setTimeout(() => {
      history.push("/home");
      history.push("/viewnotes");
    }, 1000);
  };

  //Usando color por enquanto, criar um campo de cor na nota
  const setNoteColor = (colorValue) => {
    note.color = colorValue;

    var data = { ...note };

    routesServices
      .updateNote(note.id, data)
      .then((res) => {
        history.push("/viewnotes");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div
      className="note"
      style={{ background: note.color, position: "relative" }}
    >
      <div
        className="tcheckbox"
        style={{ display: "flex", alignContent: "flex-end" }}
      >
        <label>
          <input
            type="checkbox"
            className="filled-in"
            checked={note.selected}
            onClick={checkboxStatus}
          />
          <span></span>
        </label>

        <input
          type="color"
          value={note.color}
          onChange={(event) => setNoteColor(event.target.value)}
        ></input>
      </div>
      <div
        className="title-container"
        style={{
          color: `${
            parseInt(Number(parseInt(note.color.replace(/^#/, ""), 16)), 10) <
            parseInt(Number("0x808080"), 10)
              ? "white"
              : "black"
          }`,
        }}
      >
        {note.title}
      </div>
      <div
        className="txt-container"
        style={{ marginBottom: 32 }}
        dangerouslySetInnerHTML={{ __html: note.content }}
      />
      <div
        className="btn-container-vn"
        style={{ position: "absolute", bottom: 0, left: 0 }}
      >
        <Link to={{ pathname: "editnote/" + note.id, state: note }}>
          <button
            className="edit, waves-effect waves-light btn-small green darken-2 "
            style={{ zIndex: 0, width: "auto", minWidth: 0, margin: "0" }}
          >
            {t("edit")}
          </button>
        </Link>
        <Link to={{ pathname: "note/" + note.id, state: { notes: note } }}>
          <button
            className="view, waves-effect waves-light btn-small"
            style={{ zIndex: 0, width: "auto", minWidth: 0, margin: "0" }}
          >
            {t("view")}
          </button>
        </Link>
        <button
          style={{ zIndex: 0, width: "auto", minWidth: 0, margin: "0" }}
          className="delete, waves-effect waves-light btn-small red darken-4"
          onClick={handleModalOpen}
        >
          {t("delete")}
        </button>

        {isModalOpen && (
          <ContainerModal
            type={"note"}
            handleModalClose={handleModalClose}
            handleFormSubmitDelete={deleteNote}
          />
        )}
      </div>
    </div>
  );
}
