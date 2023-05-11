import { createSlice } from '@reduxjs/toolkit';

const name = 'users';

export const initialState = {
    users: [],
    user: null,
    loginLoading: false,
    loginError: null,
    forgotLoading: false,
    forgotError: null,
    registerLoading: false,
    registerError: null,
    logoutLoading: false,
    logoutError: null,
    loading: false,
    error: null,
};

const usersSlice = createSlice({
    name,
    initialState,
    reducers: {
        fetchUsersRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchUsersSuccess(state, action) {
            state.loading = false;
            state.users = action.payload;
        },
        fetchUsersFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        registerRequest(state) {
            state.registerLoading = true;
            state.registerError = null;
        },
        registerSuccess(state, action) {
            state.registerLoading = false;
            state.user = action.payload;
        },
        registerFailure(state, action) {
            state.registerLoading = false;
            state.registerError = action.payload;
        },
        loginRequest(state) {
            state.loginLoading = true;
            state.loginError = null;
        },
        loginSuccess(state, action) {
            state.loginLoading = false;
            state.user = action.payload;
        },
        loginFailure(state, action) {
            state.loginLoading = false;
            state.loginError = action.payload;
        },
        logoutRequest(state) {
            state.logoutLoading = true;
            state.logoutError = null;
        },
        logoutSuccess(state) {
            state.logoutLoading = false;
            state.user = null;
        },
        logoutFailure(state, action) {
            state.logoutLoading = false;
            state.logoutError = action.payload;
        },
        deleteTeamRequest(state) {
            state.loading = true;
            state.error = null;
        },
        deleteTeamSuccess(state, action) {
            state.loading = false;
            state.users = [...state.users.filter(us => us._id !== action.payload)];
        },
        deleteTeamFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        addPracticeScore(state, action) {
            const {points, challengeId} = action.payload;

            state.user.practicePoints += points;

            if (challengeId) {
                console.log(challengeId);
                state.user.solvedPracticeChallenges.push(challengeId);
            }
        },
        clearLoginErrors(state) {
            state.loginError = null
        },
        // forgotPasswordRequest(state) {
        //     state.forgotLoading = true;
        //     state.forgotError = null;
        // },
        // forgotPasswordSuccess(state) {
        //     state.forgotLoading = false;
        // },
        // forgotPasswordFailure(state, action) {
        //     state.forgotLoading = false;
        //     state.forgotError = action.payload;
        // },
        // resetPasswordRequest(state) {
        //     state.loginLoading = true;
        //     state.loginError = null;
        // },
        // resetPasswordSuccess(state) {
        //     state.loginLoading = false;
        // },
        // resetPasswordFailure(state, action) {
        //     state.loginLoading = false;
        //     state.loginError = action.payload;
        // },
    },
});

export const {
    fetchUsersRequest,
    fetchUsersSuccess,
    fetchUsersFailure,
    registerRequest,
    registerSuccess,
    registerFailure,
    loginRequest,
    loginSuccess,
    loginFailure,
    logoutRequest,
    logoutSuccess,
    logoutFailure,
    deleteTeamRequest,
    deleteTeamSuccess,
    deleteTeamFailure,
    addPracticeScore,
    clearLoginErrors
} = usersSlice.actions;

export default usersSlice;
