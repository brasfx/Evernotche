import {combineReducers, createStore} from "redux";
import counterReducer from "./ducks/counter";
import selectorReducer from "./ducks/selectnote";

const reducer = combineReducers({
    counter: counterReducer,
    selectnote: selectorReducer

});

const store = createStore(reducer);

export default store;