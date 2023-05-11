import axiosApi from '../../axiosApi';
import {
    checkResultFailure,
    checkResultRequest, checkResultSuccess,
    createChallengeFailure,
    createChallengeRequest,
    createChallengeSuccess,
    deleteChallengeFailure,
    deleteChallengeRequest,
    deleteChallengeSuccess, editChallengeFailure,
    editChallengeRequest, editChallengeSuccess,
    fetchChallengesFailure,
    fetchChallengesRequest,
    fetchChallengesSuccess
} from "../slices/challengesSlice";
import {addNotification} from "./notifierActions";
import {message} from "antd";
import {addPracticeScore} from "../slices/usersSlice";

export const fetchChallenges = query => {
    return async dispatch => {
        try {
            dispatch(fetchChallengesRequest());

            let response;

            if (query) {
                response = await axiosApi.get('/challenges' + query);
            } else {
                response = await axiosApi.get('/challenges');
            }

            dispatch(fetchChallengesSuccess(response.data));
        } catch (e) {
            dispatch(fetchChallengesFailure(e));
        }
    };
};

export const createChallenge = challengeData => {
    return async dispatch => {
        try {
            dispatch(createChallengeRequest());

            const response = await axiosApi.post('/challenges', challengeData);

            dispatch(createChallengeSuccess(response.data));
        } catch (e) {
            dispatch(addNotification('Произошла ошибка!', "error"));
            if (e.response && e.response.data) {
                dispatch(createChallengeFailure(e.response.data));
                throw e;
            } else {
                dispatch(createChallengeFailure({global: 'No internet'}));
                throw e;
            }
        }
    };
};

export const editChallenge = (id, formData, challengeData) => {
    return async dispatch => {
        try {
            dispatch(editChallengeRequest());

            await axiosApi.put("/challenges/" + id, formData);

            dispatch(editChallengeSuccess({id, challengeData}));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(editChallengeFailure(e.response.data));
            } else {
                dispatch(editChallengeFailure({global: 'No internet'}));
            }
        }
    };
};

export const deleteChallenge = id => {
    return async (dispatch) => {
        try {
            dispatch(deleteChallengeRequest());

            await axiosApi.delete(`/challenges/${id}`);

            dispatch(deleteChallengeSuccess(id));
        } catch (e) {
            dispatch(deleteChallengeFailure(e));
        }
    };
};

export const checkAccuracyChallenge = (id, result) => {
    return async dispatch => {
        try {
            dispatch(checkResultRequest());

            const response = await axiosApi.post('/challenges/' + id, result);

            if (response.data.error) {
                dispatch(checkResultSuccess());
                return message.error("Wrong answer!").then(r => r);
            }

            message.success(response.data.message).then(r => r);

            await dispatch(checkResultSuccess(response.data));
            await dispatch(addPracticeScore(response.data));

            return response.data;
        } catch (e) {
            dispatch(checkResultFailure(e));
        }
    };
};