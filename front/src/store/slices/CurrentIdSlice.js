import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    currentId: '',
    isDsTableOpen: false,
    isTsTableOpen: false,
    isAttackTreeOpen: false,
    attackScene: {},
    isLevelOpen: false,
    levelDts:{}
};

const CurrentIdSlice = createSlice({
    name: 'Pagename',
    initialState,
    reducers: {
        storeCurrentId: (state, action) => {
            console.log('action', action);
            return { ...state, currentId: action.payload };
        },
        DsTableOpen: (state) => {
            return { ...state, isDsTableOpen: true, isTsTableOpen: false, isAttackTreeOpen: false, isLevelOpen: false };
        },
        DsTableClose: (state) => {
            return { ...state, isDsTableOpen: false };
        },
        TsTableOpen: (state) => {
            return { ...state, isTsTableOpen: true, isDsTableOpen: false, isAttackTreeOpen: false, isLevelOpen: false };
        },
        TsTableClose: (state) => {
            return { ...state, isTsTableOpen: false };
        },
        AttackTreePageOpen: (state) => {
            return { ...state, isAttackTreeOpen: true, isTsTableOpen: false, isDsTableOpen: false, isLevelOpen: false };
        },
        AttackTreePageClose: (state) => {
            return { ...state, isAttackTreeOpen: false };
        },
        setAttackScene: (state, action) => {
            return { ...state, attackScene: action.payload };
        },
        levelOpen: (state,action) => {
            console.log('action', action)
            return { ...state,levelDts:action.payload, isLevelOpen: true, isTsTableOpen: false, isDsTableOpen: false };
        },
        levelClose: (state) => {
            return { ...state, isLevelOpen: false };
        }
    }
});

export const {
    storeCurrentId,
    DsTableOpen,
    DsTableClose,
    TsTableOpen,
    TsTableClose,
    AttackTreePageOpen,
    AttackTreePageClose,
    setAttackScene,
    levelOpen,
    levelClose,
} = CurrentIdSlice.actions;
export default CurrentIdSlice.reducer;
