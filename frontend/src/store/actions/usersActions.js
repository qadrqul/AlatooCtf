import axiosApi from '../../axiosApi';
import {
    loginFailure,
    loginRequest,
    loginSuccess,
    logoutRequest,
    logoutSuccess,
    logoutFailure,
    registerRequest,
    registerSuccess,
    registerFailure,
    fetchUsersRequest,
    fetchUsersSuccess,
    fetchUsersFailure,
    deleteTeamRequest,
    deleteTeamFailure,
    deleteTeamSuccess,
} from '../slices/usersSlice';
import {historyPush} from "./historyActions";
import {addNotification} from "./notifierActions";
import {message} from "antd";

export const fetchUsers = query => {
    return async dispatch => {
        try {
            dispatch(fetchUsersRequest());

            let response;

            if (query) {
                response = await axiosApi.get('/users' + query);
            } else {
                response = await axiosApi.get('/users');
            }


            dispatch(fetchUsersSuccess(response.data));
        } catch (e) {
            message.error("Oops, an error has occurred").then(e => e);

            if (e.response && e.response.data) {
                dispatch(fetchUsersFailure(e.response.data));
                throw e;
            } else {
                dispatch(fetchUsersFailure({global: 'No internet'}));
                throw e;
            }
        }
    };
};

export const registerUser = userData => {
    return async dispatch => {
        try {
            dispatch(registerRequest());

            const response = await axiosApi.post('/users', userData);

            dispatch(registerSuccess(response.data));
            dispatch(addNotification('Вы успешно зарегистрировались!', "success"));
            dispatch(historyPush('/'));
        } catch (e) {
            dispatch(addNotification('Произошла ошибка!', "error"));
            if (e.response && e.response.data) {
                dispatch(registerFailure(e.response.data));
                throw e;
            } else {
                dispatch(registerFailure({global: 'No internet'}));
                throw e;
            }
        }
    };
};

export const loginUser = userData => {
    return async dispatch => {
        try {
            dispatch(loginRequest());

            const response = await axiosApi.post('/users/sessions', userData);

            dispatch(loginSuccess(response.data.user));
            dispatch(addNotification('Вы успешно авторизовались!', "success"));
            dispatch(historyPush('/'));
        } catch (e) {
            dispatch(addNotification('Произошла ошибка!', "error"));
            if (e.response && e.response.data) {
                dispatch(loginFailure(e.response.data));
                throw e;
            } else {
                dispatch(loginFailure({global: 'No internet'}));
                throw e;
            }
        }
    };
};

export const logoutUser = () => {
    return async (dispatch) => {
        try {
            dispatch(logoutRequest());

            await axiosApi.delete('/users/sessions');

            dispatch(logoutSuccess());
        } catch (e) {
            dispatch(logoutFailure(e));
        }
    };
};

export const deleteTeam = id => {
    return async (dispatch) => {
        try {
            dispatch(deleteTeamRequest());

            await axiosApi.delete('/users/' + id);

            dispatch(deleteTeamSuccess(id));
        } catch (e) {
            dispatch(deleteTeamFailure(e));
        }
    };
};

// export const forgotPassword = email => {
//     return async dispatch => {
//         try {
//             dispatch(forgotPasswordRequest());
//
//             await axiosApi.post('/users/forgot-password', {email});
//
//             dispatch(forgotPasswordSuccess());
//         } catch (e) {
//             dispatch(forgotPasswordFailure(e.response.data));
//             throw e;
//         }
//     };
// };
//
// export const resetPassword = (id, token, userData) => {
//     return async dispatch => {
//         try {
//             dispatch(resetPasswordRequest());
//
//             await axiosApi.post(`/users/reset-password/${id}/${token}`, userData);
//
//             dispatch(resetPasswordSuccess());
//             dispatch(historyPush('/'));
//         } catch (e) {
//             dispatch(resetPasswordFailure(e.response.data));
//         }
//     };
// };