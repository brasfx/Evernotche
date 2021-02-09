export default function reducer(state, action) {
    switch (action.type) {
        case 'SET_CURRENT_NOTE':
            return {
                ...state,
                currentNote: action.payload
            }
        
        case 'UPDATE':
            return {
                ...state,
            }

        default:
            return state;


    }

}