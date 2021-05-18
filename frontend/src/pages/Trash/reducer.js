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
      return {
        ...action.data,
      };

    case "RECOVER":
      return {
        ...routesServices.recoverNote(note),
      };

    case "DELETE_NOTE":
      return {
        ...routesServices.removeNote(note),
      };

    default:
      return state;
  }
}
