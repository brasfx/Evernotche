import React, { useContext, useReducer, useState, useEffect } from 'react';
//import NotesContext from './context.js';
import './style.css';
import ContainerModal from '../../components/Modal';
import { useTranslation } from 'react-i18next';
import * as FaIcons from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import routesServices from '../../services/routesServices';
import Select from 'react-select';

export default function Panel({
  notes,
  dispatch,
  cngRows,
  setSearchQuery,
  setNotesOrder,
}) {
  /*const {state} = useContext(NotesContext);
    const {dispatch} = useContext(NotesContext);*/
  const { t } = useTranslation();
  const selectStyles = {
    container: (provided) => ({
      ...provided,
      width: '100%',
      display: 'flex',
      height: '54px',
      zIndex: 1000,
      position: 'relative',
      display: 'inline-block',
      verticalAlign: 'middle',
      margin: 20,
      maxWidth: '200px',
    }),
    indicatorSeparator: (provided) => ({ ...provided, display: 'none' }),
    valueContainer: (provided) => ({ ...provided, height: '54px' }),
    menu: (provided) => ({ ...provided, margin: 2 }),
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notestoDelete, setNotestoDelete] = useState([]);
  const [sortType, setSortType] = useState('A-Z');
  const history = useHistory();
  const selectedNotes = [];
  const options = [
    { value: 'A-Z', label: 'A-Z' },
    { value: 'Z-A', label: 'Z-A' },
    { value: 'oldest', label: t('sort_by_oldest') },
    { value: 'newest', label: t('sort_by_newest') },
  ];

  useEffect(() => {
    handleSortChange(options[3]);
  }, []);

  const handleSortChange = (value) => {
    if (value) console.log(value);

    const option = value.value;
    setSortType(option);
    setNotesOrder(option);
  };
  function setSelect(note, selected) {
    dispatch({ type: 'SET_NOTE', id: note.id, data: { ...note, selected } });
  }
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const deleteNote = () => {
    //console.log(notestoDelete);
    const noteTemplate = {
      userid: localStorage.getItem('id'),
      noteid: '',
    };
    notestoDelete.forEach((item) => {
      noteTemplate.noteid = item;
      routesServices.sendTrash(noteTemplate);
    });
    // dispatch({ type: 'SEND_TRASH_BULK', payload: notestoDelete });
    setTimeout(() => {
      history.push('/home');
      history.push('/viewnotes');
    }, 1000);
  };
  return (
    <div className="panel-container">
      <div
        style={{
          position: 'relative',
          display: 'flex ',
          verticalAlign: 'middle',
          maxHeight: 54,
          margin: '20px',
        }}
      >
        <FaIcons.FaSearch
          style={{
            position: 'absolute',
            top: '45%',
            right: '100%',
          }}
        />
        <input
          type="text"
          onChange={(event) => setSearchQuery(event.target.value)}
          style={{ maxWidth: '170px' }}
        />
      </div>
      <button
        className="button-panel waves-effect waves-light btn-large grey darken-2"
        onClick={() => {
          {
            Object.keys(notes).map((id, i) => {
              const note = notes[id];
              if (note.selected && !selectedNotes.includes(note.id)) {
                selectedNotes.push(note.id);
              } else if (!note.selected && selectedNotes.includes(note.id)) {
                selectedNotes = selectedNotes.filter(
                  (item) => item !== note.id
                );
              }
            });

            setNotestoDelete(selectedNotes);

            handleModalOpen();
          }
        }}
      >
        {t('check_notes')}
      </button>

      <button
        className="button-panel waves-effect waves-light btn-large grey darken-2"
        onClick={() => {
          let counter = 0;

          Object.keys(notes).map((id, i) => {
            const note = notes[id];
            if (note.selected) {
              counter++;
            }
          });

          if (counter === Object.keys(notes).length || counter === 0) {
            Object.keys(notes).map((id, i) => {
              const note = notes[id];
              setSelect(note, !note.selected);
            });
          } else {
            Object.keys(notes).map((id, i) => {
              const note = notes[id];
              setSelect(note, true);
            });
          }
        }}
      >
        {t('select_all_notes')}
      </button>
      <button
        className="button-panel waves-effect waves-light btn-large grey darken-2"
        onClick={cngRows}
      >
        {t('change_layout')}
      </button>

      {isModalOpen && (
        <ContainerModal
          type={'confirm_multiple'}
          handleModalClose={handleModalClose}
          handleFormSubmitDelete={deleteNote}
        />
      )}

      <Select
        id="country"
        name="country"
        onChange={handleSortChange}
        options={options}
        styles={selectStyles}
        placeholder={t('sort_selection_message')}
      ></Select>
    </div>
  );
}
