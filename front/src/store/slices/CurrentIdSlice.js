import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    currentId: '',
    isDsTableOpen: false,
    isTsTableOpen: false,
    isCyberTableOpen: false,
    isAttackTreeOpen: false,
    isLevelOpen: false,
    isCyberBlockOpen: false,
    attackScene: {},
    levelDts: {}
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
            return {
                ...state,
                isDsTableOpen: true,
                isTsTableOpen: false,
                isAttackTreeOpen: false,
                isLevelOpen: false,
                isCyberBlockOpen: false,
                isCyberTableOpen: false
            };
        },
        TsTableOpen: (state) => {
            return {
                ...state,
                isTsTableOpen: true,
                isDsTableOpen: false,
                isAttackTreeOpen: false,
                isLevelOpen: false,
                isCyberBlockOpen: false,
                isCyberTableOpen: false
            };
        },
        AttackTreePageOpen: (state) => {
            return {
                ...state,
                isAttackTreeOpen: true,
                isTsTableOpen: false,
                isDsTableOpen: false,
                isLevelOpen: false,
                isCyberBlockOpen: false,
                isCyberTableOpen: false
            };
        },
        setAttackScene: (state, action) => {
            return { ...state, attackScene: action.payload };
        },
        levelOpen: (state, action) => {
            return {
                ...state,
                levelDts: action.payload,
                isLevelOpen: true,
                isTsTableOpen: false,
                isDsTableOpen: false,
                isCyberBlockOpen: false,
                isCyberTableOpen: false
            };
        },
        cyberBlockOpen: (state) => {
            return {
                ...state,
                isCyberBlockOpen: true,
                isAttackTreeOpen: false,
                isTsTableOpen: false,
                isDsTableOpen: false,
                isLevelOpen: false,
                isCyberTableOpen: false
            };
        },
        cyberTableOpen: (state) => {
            return {
                ...state,
                isCyberTableOpen: true,
                isCyberBlockOpen: false,
                isAttackTreeOpen: false,
                isTsTableOpen: false,
                isDsTableOpen: false,
                isLevelOpen: false
            };
        },
        closeAll: (state) => {
            return {
                ...state,
                isAttackTreeOpen: false,
                isTsTableOpen: false,
                isDsTableOpen: false,
                isLevelOpen: false,
                isCyberBlockOpen: false,
                isCyberTableOpen: false
            };
        }
    }
});

export const {
    storeCurrentId,
    DsTableOpen,
    TsTableOpen,
    AttackTreePageOpen,
    setAttackScene,
    levelOpen,
    cyberBlockOpen,
    closeAll,
    cyberTableOpen
} = CurrentIdSlice.actions;
export default CurrentIdSlice.reducer;
