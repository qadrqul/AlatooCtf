import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import thunk from "redux-thunk";
import usersSlice from "./slices/usersSlice";
import {loadFromLocalStorage, saveToLocalStorage} from "./localStorage";
import challengesSlice from "./slices/challengesSlice";
import competitionsSlice from "./slices/competitionsSlice";
import bannersSlice from "./slices/bannersSlice";

const rootReducer = combineReducers({
    users: usersSlice.reducer,
    challenges: challengesSlice.reducer,
    competitions: competitionsSlice.reducer,
    banners: bannersSlice.reducer,
});

const persistedState = loadFromLocalStorage();
const middleware = [thunk];

const store = configureStore({
    reducer: rootReducer,
    middleware,
    devTools: true,
    preloadedState: persistedState,
});


store.subscribe(() => {
    saveToLocalStorage({
        users: {
            user: store.getState().users.user,
        },
    });
});

axiosApi.interceptors.request.use(config => {
    try {
        config.headers['Authorization'] = store.getState().users.user.token;
    } catch (e) {}

    return config;
});

axiosApi.interceptors.response.use(res => res, e => {
    if (!e.response.data) {
        e.response = {data: {global: 'No internet!'}};
    }

    throw e;
});

export default store;