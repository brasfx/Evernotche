import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router'
import Spinner from '../../components/Spinner';
import routesServices from '../../services/routesServices';
import Navbar from '../Home/Navbar'
import TextEditor from './editor'

export default function ModifyNote() {
    const location = useParams();
    const [note, setNote] = useState("");
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

        });
    }, []);

    return (
        <div>
            <Navbar />
            
                {note ? <TextEditor note={note} /> : <div style={{display: "grid", placeContent: "center"}}> <Spinner description="Carregando..." /> </div>}
            
        </div>
    )
}

