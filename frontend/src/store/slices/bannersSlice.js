import {createSlice} from '@reduxjs/toolkit';

const name = 'banners';

export const initialState = {
    banner: null,
    loading: false,
    error: null
};

const bannersSlice = createSlice({
    name,
    initialState,
    reducers: {
        fetchBannerRequest(state) {
            state.loading = true;
            state.error = null;
        },
        fetchBannerSuccess(state, action) {
            state.loading = false;
            state.banner = action.payload;
        },
        fetchBannerFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        editBannerRequest(state) {
            state.loading = true;
            state.error = null;
        },
        editBannerSuccess(state, action) {
            state.loading = false;
            state.banner = action.payload;
        },
        editBannerFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchBannerRequest,
    fetchBannerSuccess,
    fetchBannerFailure,
    editBannerRequest,
    editBannerSuccess,
    editBannerFailure
} = bannersSlice.actions;

export default bannersSlice;
