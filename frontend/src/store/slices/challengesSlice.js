import {createSlice} from '@reduxjs/toolkit';

const name = 'challenges';

export const initialState = {
    challenges: [],
    challenge: null,
    loading: false,
    error: null
};

const challengesSlice = createSlice({
    name,
    initialState,
    reducers: {
        fetchChallengesRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchChallengesSuccess(state, action) {
            state.loading = false;
            state.challenges = action.payload;
        },
        fetchChallengesFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        createChallengeRequest(state) {
            state.loading = true;
            state.error = null;
        },
        createChallengeSuccess(state, action) {
            state.loading = false;
            state.challenges = [...state.challenges, action.payload];
        },
        createChallengeFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        editChallengeRequest(state) {
            state.loading = true;
            state.error = null;
        },
        editChallengeSuccess(state, action) {
            state.loading = false;
            const idx = state.challenges.findIndex(c => c._id === action.payload.id);

            if (state.challenges[idx].category !== action.payload.challengeData.category) {
                state.challenges =
                    [...state.challenges.filter(c => c._id !== action.payload.id)];

                return;
            }

            state.challenges[idx] = action.payload.challengeData;
        },
        editChallengeFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        checkResultRequest(state) {
            state.loading = true;
            state.error = null;
        },
        checkResultSuccess(state) {
            state.loading = false;
        },
        checkResultFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        deleteChallengeRequest(state) {
            state.loading = true;
            state.error = null;
        },
        deleteChallengeSuccess(state, action) {
            state.loading = false;
            state.challenges = [...state.challenges.filter(c => c._id !== action.payload)];
        },
        deleteChallengeFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchChallengesRequest,
    fetchChallengesSuccess,
    fetchChallengesFailure,
    createChallengeRequest,
    createChallengeSuccess,
    createChallengeFailure,
    editChallengeRequest,
    editChallengeSuccess,
    editChallengeFailure,
    deleteChallengeRequest,
    deleteChallengeSuccess,
    deleteChallengeFailure,
    checkResultRequest,
    checkResultSuccess,
    checkResultFailure
} = challengesSlice.actions;

export default challengesSlice;
