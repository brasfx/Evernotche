const SELECT = "select";

export const select = (payload) => ({
    type: SELECT,
    payload: payload

});

const initialState = {
    selected: false,
    id: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SELECT:
            //Mantem o state igual, exceto pelo count
            return {...state, selected: !state.selected, id: action.payload};

        default:
            return state;

    }
};