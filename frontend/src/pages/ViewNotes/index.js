import React from 'react';
import Navbar from '../Home/Navbar.js';
import NoteItem from './NoteItem.js';

export default function ViewNotes() {

    const notes = [];

    return (
        <div>
            <Navbar />
            <div className="container">

                <NoteItem />
            </div>
        </div>
    )
}