export default function reducer(state, action) {


    switch (action.type) {
        case 'SET_NOTE':
            console.log(action.data.selected);
            return {
                ...state,
                [action.id]: action.data
            }

        case 'UPDATE':
            return {
                ...state,
                ...action.data
            }

        case 'DELETE_NOTE':
            return {
                // TODO
                ...state
            }

        default:
            return state;
    }

}