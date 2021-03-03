import React from 'react'
import { useLocation, Link } from "react-router-dom";

export default function ShowNote() {
    const { state } = useLocation();

    return (<div dangerouslySetInnerHTML={{ __html: state.notes.content }} />)
}
