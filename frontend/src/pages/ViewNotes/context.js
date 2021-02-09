import React from 'react'

const NotesContext = React.createContext({
    currentNode: null,
    notes: [
        { id: 1, content: 'a', owner: 'a', selected: false},
        { id: 2, content: 'b', owner: 'b', selected: false },
        { id: 3, content: 'c', owner: 'c', selected: false}
    ]
});

export default NotesContext;