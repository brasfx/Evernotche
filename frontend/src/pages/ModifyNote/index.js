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
        routesServices.findNote(user).then((result) => {

            const notesData = result.data.reduce((acc, entry) => {
                const { _id, payload, userid, timestamp, title } = entry;
                acc[_id] = { id: _id, title, content: payload, owner: userid, timestamp, selected: false };
                return acc;
            }, {})
            console.log(notesData[location.id])

            setNote(notesData[location.id])

        });
    }, []);

    return (
        <div>
            <Navbar />
            {note ? <TextEditor note={note} /> : <Spinner description="Carregando..." />}
        </div>
    )
}

