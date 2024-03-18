import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    currentId: '',
    isTableOpen:false,
};

const CurrentIdSlice = createSlice({
  name: 'Pagename',
  initialState,
  reducers: {
    storeCurrentId: (state, action) => {
        console.log('action', action)
      return { ...state, currentId: action.payload };
    },
    TableOpen:(state, action) =>{
      console.log('action', action)
      return { ...state, isTableOpen:true }
    },
    TableClose:(state, action) =>{
      console.log('action', action)
      return { ...state, isTableOpen:false }
    }
  }
});

export const { storeCurrentId, TableOpen, TableClose } = CurrentIdSlice.actions;
export default CurrentIdSlice.reducer;
