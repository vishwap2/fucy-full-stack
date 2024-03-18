import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import CurrentIdSlice from './slices/CurrentIdSlice';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    currentId:CurrentIdSlice
});

export default reducer;
