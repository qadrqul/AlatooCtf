import axiosApi from "../../axiosApi";
import {
    editBannerFailure,
    editBannerRequest,
    editBannerSuccess, fetchBannerFailure,
    fetchBannerRequest,
    fetchBannerSuccess
} from "../slices/bannersSlice";
import {historyPush} from "./historyActions";

export const fetchBanner = () => {
    return async dispatch => {
        try {
            dispatch(fetchBannerRequest());

            const response = await axiosApi.get("/banners");

            dispatch(fetchBannerSuccess(response.data));
        } catch (e) {
            dispatch(fetchBannerFailure(e));
        }
    }
}
export const editBanner = formData => {
    return async dispatch => {
        try {
            dispatch(editBannerRequest());

            const response = await axiosApi.post("/banners", formData);

            dispatch(editBannerSuccess(response.data));
            dispatch(historyPush("/"));
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(editBannerFailure(e.response.data));
            } else {
                dispatch(editBannerFailure({global: 'No internet'}));
            }
        }
    };
};