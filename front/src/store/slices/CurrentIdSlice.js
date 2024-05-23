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
    levelDts: {},
    isRightDrawerOpen: false,
    isNavbarClose: false,
    activeTab: '',
    isDark: false
};

const CurrentIdSlice = createSlice({
    name: 'Pagename',
    initialState,
    reducers: {
        storeCurrentId: (state, action) => {
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
        drawerOpen: (state, action) => {
            return {
                ...state,
                activeTab: action.payload,
                isRightDrawerOpen: true
            };
        },
        drawerClose: (state) => {
            return {
                ...state,
                activeTab: '',
                isRightDrawerOpen: false
            };
        },
        navbarSlide: (state) => {
            return {
                ...state,
                isNavbarClose: !state.isNavbarClose
            };
        },
        changeMode: (state) => {
            return {
                ...state,
                isDark: !state.isDark
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
                isCyberTableOpen: false,
                activeTab: '',
                isRightDrawerOpen: false
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
    cyberTableOpen,
    drawerOpen,
    drawerClose,
    changeMode,
    navbarSlide
} = CurrentIdSlice.actions;
export default CurrentIdSlice.reducer;
