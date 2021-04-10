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
      return {
        // TODO
        ...state,
      };

    default:
      return state;
  }
}
