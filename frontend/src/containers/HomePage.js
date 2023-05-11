import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchBanner} from "../store/actions/bannersActions";
import {apiUrl} from "../config";

const HomePage = () => {
    const dispatch = useDispatch();
    const banner = useSelector(state => state.banners.banner);

    useEffect(() => {
        dispatch(fetchBanner());
    }, [dispatch])

    return (
        <div className="home">
            {/*<div className="home__page">*/}
            {/*    <div className="container-sm">*/}
            {/*        <p>AIU CTF Homepage</p>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div className="container-sm">
                <div className="home__image">
                    <img src={apiUrl + '/' + banner?.image} alt="banner"/>
                </div>

                <div className="home__description">
                    <p>{banner?.text}</p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;