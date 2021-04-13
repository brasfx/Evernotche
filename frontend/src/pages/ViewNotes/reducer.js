import routesServices from "../../services/routesServices";

export default function reducer(state, action) {
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

    case "DELETE_NOTE":
      console.log(action.payload);
      return {
        // TODO
        ...routesServices.removeNote(action.payload),
      };

    default:
      return state;
  }
}
