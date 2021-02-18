import React from 'react'
import { useLocation, Link } from "react-router-dom";

export default function ShowNote() {
    const { state } = useLocation();
    
    return (
        <div>
            <p>{state.notes.content}</p>
        </div>
    )
}
