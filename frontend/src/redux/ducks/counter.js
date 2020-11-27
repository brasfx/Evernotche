const INCREMENT = "increment";
const DECREMENT = "decrement";

export const increment = () => ({
    type: INCREMENT

});

export const decrement = () => ({
    type: DECREMENT

});

const initialState = {
    count: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT:
            //Mantem o state igual, exceto pelo count
            return {...state, count: state.count + 1};

        case DECREMENT:
            return {...state, count: state.count - 1};

        default:
            return state;

    }
};