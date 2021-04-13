import routesServices from "../../services/routesServices";
export default function reducer(state, action) {
  const note = {
    userid: localStorage.getItem("id"),
    noteid: action.payload,
  };
  switch (action.type) {
    
    case "SET_NOTE":
      return {
        ...state,
        [action.id]: action.data,
      };

    case "UPDATE":
      console.log(action.data);

      return {
        ...action.data,
      };

    case "RECOVER":

      console.log(note);
      return {
        // TODO
        ...routesServices.recoverNote(note),
        //...routesServices.sendTrash(action.payload),
      };

      case "DELETE_NOTE":

        console.log(note);
        return {
          // TODO
          ...routesServices.removeNote(note),
          //...routesServices.sendTrash(action.payload),
        };

    default:
      return state;
  }
}
