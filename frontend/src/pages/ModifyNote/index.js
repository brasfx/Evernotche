import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router'
import Spinner from '../../components/Spinner';
import routesServices from '../../services/routesServices';
import Navbar from '../Home/Navbar'
import TextEditor from './editor'

export default function ModifyNote() {
    const location = useParams();
    const [note, setNote] = useState("");
    const [title, setTitle] = useState('')

    useEffect(() => {
        const user = {
            userid: localStorage.getItem('id')
        };
        
        routesServices.findSingleNote({noteid: location.id, userid: user.userid}).then((result) => {
    
            const noteData = result.data.reduce((acc, entry) => {
                const { _id, payload, userid, timestamp, title } = entry;
                acc = { id: _id, title, content: payload, owner: userid, timestamp, selected: false };
                return acc;
            }, {})
            console.log(noteData)

            setNote(noteData)
            setTitle(note.title)

        });
    }, []);

    return (
        <div>
            <Navbar />
            <label class="titleLabel" style={{fontSize: "30px", color: "black"}}>Título</label>
            <input defaultValue={note.title} onChange={event => setTitle(event.target.value)}></input>
            {note ? <TextEditor note={note} newTitle={title}/> : <div style={{display: "grid", placeContent: "center"}}> <Spinner description="Carregando..." /> </div>}
            
        </div>
    )
}

