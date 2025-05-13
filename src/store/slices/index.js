import { combineReducers } from "redux";
import formSlice from "./formSlice";
import unsubscribeSlice from "./unsubscribeSlice";

const rootReducer = combineReducers({
    form: formSlice.reducer,
    unsubscribe: unsubscribeSlice.reducer
})

export default rootReducer