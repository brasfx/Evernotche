import React, {useState} from 'react';
import Navbar from '../Home/Navbar';
import TextEditor from '../Home/Editor';

export default function AddNote() {
  const [title, setTitle] = useState('')

  return (
    <div>
      <Navbar />
      <label class="titleLabel" style={{fontSize: "30px", color: "black"}}>Título</label>
      <input onChange={event => setTitle(event.target.value)}></input>
      <TextEditor title={title} />
    </div>
  );
}
