import React, {useState} from 'react';
import './noteitem.css';
import NoteSelect from './NoteSelect.js'
import {useSelector} from "react-redux";


export default function NoteItem() {
    const [note, setNote] = useState({
        id: "",
        content: "",
        owner: "",
        selected: false
    });
    
    const selectedAux = useSelector((state) => state.selectnote.selected);
    
    if (note.selected != selectedAux) {
        setNote({...note, selected: selectedAux});

    }

    return (
        <div className="noteitem">
            <NoteSelect></NoteSelect>
            <label>{note.selected.toString()}</label>
            
        </div>
    )
}