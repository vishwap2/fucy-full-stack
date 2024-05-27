import { createSlice } from '@reduxjs/toolkit';

const initialState ={
    isCanvasPage:false,
}

const CanvasSlice = createSlice({
    name: 'Canvas',
    initialState,
    reducers:{
        changeCanvasPage:(state)=>{
            return { ...state, isCanvasPage:!state.isCanvasPage };
        },
    }
})

export const { changeCanvasPage } = CanvasSlice.actions;
export default CanvasSlice.reducer;