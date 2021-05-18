import routesServices from '../../services/routesServices';

export default function reducer(state, action) {
  switch (action.type) {
    case 'SET_NOTE':
      return {
        ...state,
        [action.id]: action.data,
      };

    case 'UPDATE':
      //console.log(action.data);

      return {
        ...action.data,
      };

    case 'SEND_TRASH':
      const note = {
        userid: localStorage.getItem('id'),
        noteid: action.payload,
      };
      //console.log(note);
      return {
        // TODO
        ...routesServices.sendTrash(note),
        //...routesServices.sendTrash(action.payload),
      };
    case 'SEND_TRASH_BULK':
      //console.log(action.payload);
      return {
        ...action.payload,
      };
    default:
      return state;
  }
}
