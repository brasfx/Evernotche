import React from 'react';
import './noteitem.css';

import {useDispatch} from "react-redux";
import {select} from "../../redux/ducks/selectnote";
import {useSelector} from "react-redux";

/* const handleClick = e => {
    
    if (e.target.style.backgroundColor == 'black') {
        e.target.style.backgroundColor = 'red';

    } else {
        e.target.style.backgroundColor = 'black';
    }
        
} */

export default function NoteSelect(props) {

    const selectedAux = useSelector((state) => state.selectnote.selected);
    const dispatch = useDispatch();
    
    const handleSelect = e => {
        dispatch(select(props.noteid));

        if (selectedAux) {
            e.target.style.backgroundColor = 'red';
        } else {
            e.target.style.backgroundColor = 'black';
        }
    
    }

    if (selectedAux) {
        
    }


    return (
        <div>
            <div className="selectionbox" onClick={handleSelect}>

            </div>
        </div>
    )
}
