import React, {useState} from 'react'
import routesServices from '../../services/routesServices'

const user = {
    userid: localStorage.getItem('id')
};
console.log('user ' + user.userid);

const aux = [];
routesServices.findNote(user).then(function(result) {
    result.data.map((entry, i) => {
        aux.push({id: entry._id, content: entry.payload, owner: entry.userid, timestamp: entry.timestamp, selected: false})
    })
    //console.log(JSON.stringify(notesAux));
    return aux;
 });


const NotesContext = React.createContext({
    currentNode: null,

    notes: aux

});


export default NotesContext;