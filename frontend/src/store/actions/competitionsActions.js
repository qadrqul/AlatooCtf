import axiosApi from '../../axiosApi';
import {message} from "antd";
import {
    createCompetitionFailure,
    createCompetitionRequest,
    createCompetitionSuccess,
    editCompetitionFailure,
    editCompetitionRequest,
    editCompetitionSuccess, enterCompetitionFailure,
    enterCompetitionRequest, enterCompetitionSuccess,
    fetchCompetitionsFailure,
    fetchCompetitionsRequest,
    fetchCompetitionsSuccess,
    fetchOneCompetitionFailure,
    fetchOneCompetitionRequest,
    fetchOneCompetitionSuccess
} from "../slices/competitionsSlice";
import {historyPush} from "./historyActions";

export const fetchCompetitions = () => {
    return async dispatch => {
        try {
            dispatch(fetchCompetitionsRequest());

            const response = await axiosApi.get('/competitions');

            dispatch(fetchCompetitionsSuccess(response.data));
        } catch (e) {
            dispatch(fetchCompetitionsFailure(e));
        }
    };
};

export const fetchOneCompetition = id => {
    return async dispatch => {
        try {
            dispatch(fetchOneCompetitionRequest());

            const response = await axiosApi.get('/competitions/' + id);

            dispatch(fetchOneCompetitionSuccess(response.data));
        } catch (e) {
            if (e.response.status === 403 || e.response.status === 500) {
                dispatch(historyPush("/"));
            }

            dispatch(fetchOneCompetitionFailure(e));
        }
    };
};

export const createCompetition = competitionData => {
    return async dispatch => {
        try {
            dispatch(createCompetitionRequest());

            const response = await axiosApi.post('/competitions', competitionData);

            dispatch(createCompetitionSuccess(response.data));
            message.success("The new competition was created successfully!");
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(createCompetitionFailure(e.response.data));
                throw e;
            } else {
                dispatch(createCompetitionFailure({global: 'No internet'}));
                throw e;
            }
        }
    };
};

export const editCompetition = (id, competitionData) => {
    return async dispatch => {
        try {
            dispatch(editCompetitionRequest());

            const response = await axiosApi.put('/competitions/' + id, competitionData);

            dispatch(editCompetitionSuccess(response.data));

            if (typeof response.data.isStarted === "boolean") {
                message.success(response.data.message);
            }
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(editCompetitionFailure(e.response.data));
                throw e;
            } else {
                dispatch(editCompetitionFailure({global: 'No internet'}));
                throw e;
            }
        }
    };
};

export const enterCompetition = password => {
    return async dispatch => {
        try {
            dispatch(enterCompetitionRequest());

            const response = await axiosApi.post('/competitions/' + password);

            message.success(response.data.message);
            dispatch(enterCompetitionSuccess(response.data));
            dispatch(historyPush("/competitions/" + response.data.id));
        } catch (e) {
            message.error(e.response.data.message);
            dispatch(enterCompetitionFailure(e));
        }
    };
};