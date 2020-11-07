import React, { Component } from 'react'
import TextEditor from '../Home/Editor'
import Navbar from '../Home/Navbar'

export class AddNote extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <TextEditor/>
            </div>
        )
    }
}

export default AddNote
