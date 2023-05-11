import React, {useState} from 'react';
import {message} from "antd";
import {useDispatch} from "react-redux";
import {editBanner} from "../store/actions/bannersActions";

const AdminBanners = () => {
    const dispatch = useDispatch();
    const [bannerData, setBannerData] = useState({
        image: "",
        text: "",
    });

    const submitFormHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();

        Object.keys(bannerData).forEach((key) => {
            formData.append(key, bannerData[key]);
        });

        dispatch(editBanner(formData));
    };

    const fileChangeHandler = (e) => {
        const name = e.target.name;
        const file = e.target.files[0];

        const reader = new FileReader();
        reader.onloadend = () => {
            if (reader.result && reader.result.toString().startsWith("data:image/")) {
                message.success("The file was successfully uploaded!")
                setBannerData((prevState) => ({...prevState, [name]: file}));
            } else {
                message.error("The selected file is not an image");
            }
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="admin-banners">
            {/*<div className="admin-competitions__page">*/}
            {/*    <div className="container-sm">*/}
            {/*        <p>Banners</p>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div className="container-sm">
                <form onSubmit={submitFormHandler}>
                    <div className="admin-banners__form">
                        <div className="admin-banners__block">
                            {/*<label>Select image</label>*/}

                            <label className="custom-file-upload">
                                <input
                                    type="file"
                                    name="image"
                                    className="custom-file-input"
                                    onChange={fileChangeHandler}
                                />
                                {bannerData.image ? "File selected" : "Select a file"}
                            </label>
                        </div>

                        <div className="admin-banners__block">
                            <label>Description for the banner</label>

                            <textarea
                                name="text"
                                className="admin-banners__text"
                                value={bannerData.text}
                                onChange={e => setBannerData(prev => ({...prev, text: e.target.value}))}
                            />
                        </div>


                        <button
                            className="admin-banners__btn"
                            type="submit"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminBanners;