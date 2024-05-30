import { createSlice } from '@reduxjs/toolkit';

const initialState ={
    pageName:'',
}

const PageSectionSlice = createSlice({
    name: 'pageName',
    initialState,
    reducers:{
        changePage:(state,action)=>{
            return { ...state, pageName: action.payload};
        },
    }
})

export const { changePage } = PageSectionSlice.actions;
export default PageSectionSlice.reducer;