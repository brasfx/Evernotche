import React, { useState } from 'react';
import Navbar from '../Home/Navbar';
import TextEditor from '../Home/Editor';
import { useTranslation } from 'react-i18next'

export default function AddNote() {
  const [title, setTitle] = useState('');
  const { t } = useTranslation();

  return (
    <div>
      <Navbar />
      <h3
        class="titleLabel"
        style={{
          fontSize: '30px',
          color: 'black',
          marginLeft: '10px',
        }}
      >
        {t("note_title")}
      </h3>
      <input
        onChange={(event) => setTitle(event.target.value)}
        placeholder={t("insert_note_placeholder")}
        style={{
          marginLeft: '10px',
        }}
      ></input>
      <TextEditor title={title} />
    </div>
  );
}
