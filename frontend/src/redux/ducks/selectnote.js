const SELECT = "select";

export const select = () => ({
    type: SELECT

});

const initialState = {
    selected: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SELECT:
            //Mantem o state igual, exceto pelo count
            return {...state, selected: !state.selected};

        default:
            return state;

    }
};