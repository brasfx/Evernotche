import React, { useState } from 'react';
import Navbar from '../Home/Navbar';
import TextEditor from '../Home/Editor';

export default function AddNote() {
  const [title, setTitle] = useState('');

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
        Título da nota
      </h3>
      <input
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Insira aqui o titulo da sua nota"
        style={{
          marginLeft: '10px',
        }}
      ></input>
      <TextEditor title={title} />
    </div>
  );
}
