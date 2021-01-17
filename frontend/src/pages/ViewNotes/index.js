import React from 'react';
import Navbar from '../Home/Navbar.js';
import NoteItem from './NoteItem.js';

export default function ViewNotes() {

    const notes = [{id: 1, content:"a", owner:"a"}, {id: 2, content:"b", owner:"b"}, {id: 3, content:"c", owner:"c"}];

    //<NoteItem noteaux = {notes[0]} />
    //<NoteItem noteaux = {notes[1]} />

    return (
        <div>
            <Navbar />
            <div className="container">
                {notes.map((note, i) => <NoteItem noteaux={note} key={i} />)}
            </div>
        </div>
    )
}