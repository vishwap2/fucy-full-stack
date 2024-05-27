import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import CurrentIdSlice from './slices/CurrentIdSlice';
import CanvasSlice from './slices/CanvasSlice';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    currentId:CurrentIdSlice,
    canvas:CanvasSlice,
});

export default reducer;
