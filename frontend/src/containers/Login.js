import React, {useEffect, useState} from 'react';
import close from "../assets/close-eye.png";
import open from "../assets/open-eye.png";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../store/actions/usersActions";
import {clearLoginErrors} from "../store/slices/usersSlice";

const Login = () => {
    const dispatch = useDispatch();
    const error = useSelector(state => state.users.loginError);

    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const [isShow, setIsShow] = useState(false);

    const onSubmit = e => {
        e.preventDefault();
        dispatch(loginUser({...user}));
    };

    const inputUserChangeHandler = e => {
        const {name, value} = e.target;
        setUser(prev => ({...prev, [name]: value}));
    };

    useEffect(() => {
        return () => {
            dispatch(clearLoginErrors());
        }
    }, [dispatch]);

    return (
        <form onSubmit={onSubmit}>
            <div className="login">
                <div className="login__page">
                    <div></div>
                    <p className="login__title">Login</p>
                    <Link to="/register">
                        <button type="button" className="login__switch-page-btn">
                            Sign Up
                        </button>
                    </Link>
                </div>

                <div className="container-xs">
                    <div className="login__block">
                        <div className="login__input-block">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                className="login__input"
                                value={user.email}
                                onChange={inputUserChangeHandler}
                            />
                        </div>

                        <div className="login__input-block">
                            <label>Password</label>
                            <div className="login__eye-block">
                                <input
                                    type={isShow ? "text" : "password"}
                                    name="password"
                                    className="login__input"
                                    value={user.password}
                                    onChange={inputUserChangeHandler}
                                />
                                <img
                                    src={isShow ? close : open}
                                    onClick={() => setIsShow(prev => !prev)}
                                    className="login__input-eye"
                                    width="30px"
                                    alt="eye"
                                />
                            </div>
                        </div>

                        {error && <p className="login__error">{error?.error}</p>}

                        <button
                            className="login__accept"
                            type="submit"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Login;