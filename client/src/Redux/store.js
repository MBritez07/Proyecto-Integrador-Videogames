//store configuration copiar y pegar luego , quizás
import { createStore, applyMiddleware,compose } from "redux";
import rootReducer from "./reducer";
import  ThunkMiddleware  from "redux-thunk";

const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_  || compose;

const store = createStore(rootReducer,
     composeEnhancer (applyMiddleware(ThunkMiddleware)));

export default store