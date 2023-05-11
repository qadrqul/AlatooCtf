import {createSlice} from '@reduxjs/toolkit';

const name = 'competitions';

export const initialState = {
    competitions: [],
    competition: null,
    loading: false,
    error: null
};

const competitionsSlice = createSlice({
    name,
    initialState,
    reducers: {
        fetchCompetitionsRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchCompetitionsSuccess(state, action) {
            state.loading = false;
            state.competitions = action.payload;
        },
        fetchCompetitionsFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        fetchOneCompetitionRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchOneCompetitionSuccess(state, action) {
            state.loading = false;
            state.competition = action.payload;
        },
        fetchOneCompetitionFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        createCompetitionRequest(state) {
            state.loading = true;
            state.error = null;
        },
        createCompetitionSuccess(state, action) {
            state.loading = false;
            state.competitions = [...state.competitions, action.payload];
        },
        createCompetitionFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        editCompetitionRequest(state) {
            state.loading = true;
            state.error = null;
        },
        editCompetitionSuccess(state, action) {
            state.loading = false;
            state.competition.isStarted = action.payload.isStarted;
        },
        editCompetitionFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        enterCompetitionRequest(state) {
            state.loading = true;
            state.error = null;
        },
        enterCompetitionSuccess(state) {
            state.loading = false;
        },
        enterCompetitionFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchCompetitionsRequest,
    fetchCompetitionsSuccess,
    fetchCompetitionsFailure,
    fetchOneCompetitionRequest,
    fetchOneCompetitionSuccess,
    fetchOneCompetitionFailure,
    createCompetitionRequest,
    createCompetitionSuccess,
    createCompetitionFailure,
    editCompetitionRequest,
    editCompetitionSuccess,
    editCompetitionFailure,
    enterCompetitionRequest,
    enterCompetitionSuccess,
    enterCompetitionFailure
} = competitionsSlice.actions;

export default competitionsSlice;
