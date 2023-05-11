import React, {useState} from 'react';
import close from "../assets/close-eye.png";
import open from "../assets/open-eye.png";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {registerUser} from "../store/actions/usersActions";

const Register = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        users: [{username: "", lastname: "", email: ""}],
        teamName: "",
        email: "",
        password: "",
    });

    const [isShow, setIsShow] = useState(false);

    const onSubmit = async e => {
        e.preventDefault();
        await dispatch(registerUser({...user}));
    };

    const multipleChangeHandler = (e, index) => {
        const {name, value} = e.target;

        setUser((prev) => {

            prev.users[index] = {...prev.users[index], [name]: value};

            return {
                ...prev,
                users: [
                    ...prev.users,
                ]
            };
        });
    };

    const inputUserChangeHandler = e => {
        const {name, value} = e.target;
        setUser(prev => ({...prev, [name]: value}));
    };

    const addInputHandler = () => {
        setUser((prev) => ({
            ...prev,
            users: [...prev.users, {username: "", lastname: "", email: ""}],
        }));
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="register">
                <div className="register__page">
                    <p>Register your team!</p>
                </div>

                <div className="container-xs">
                    <div className="register__block">
                        {
                            user.users.map((user, idx) => (
                                <div className="register__row-block" key={idx}>
                                    <div className="register__input-block-row">
                                        <label>User {idx + 1}*</label>
                                        <input
                                            name="username"
                                            className="register__input"
                                            value={user.username}
                                            onChange={e => multipleChangeHandler(e, idx)}
                                            placeholder="First Name"
                                            required
                                        />
                                    </div>

                                    <div className="register__input-block-row">
                                        <label>Last Name*</label>
                                        <input
                                            name="lastname"
                                            className="register__input"
                                            value={user.lastname}
                                            onChange={e => multipleChangeHandler(e, idx)}
                                            placeholder="Last Name"
                                            required
                                        />
                                    </div>

                                    <div className="register__input-block-row">
                                        <label>User e-mail*</label>
                                        <input
                                            name="email"
                                            type="email"
                                            className="register__input"
                                            value={user.email}
                                            onChange={e => multipleChangeHandler(e, idx)}
                                            placeholder="User E-mail"
                                            required
                                        />
                                    </div>
                                </div>
                            ))
                        }


                        <div className="register__input-block">
                            <label>Team Name</label>
                            <input
                                name="teamName"
                                className="register__input"
                                value={user.teamName}
                                onChange={inputUserChangeHandler}
                            />
                        </div>

                        <div className="register__input-block">
                            <label>Team e-mail</label>
                            <input
                                type="email"
                                name="email"
                                autoComplete="off"
                                className="register__input"
                                value={user.email}
                                onChange={inputUserChangeHandler}
                            />
                        </div>

                        <div className="register__input-block">
                            <label>Password</label>
                            <div className="register__eye-block">
                                <input
                                    type={isShow ? "text" : "password"}
                                    name="password"
                                    autoComplete="off"
                                    className="register__input"
                                    value={user.password}
                                    onChange={inputUserChangeHandler}
                                />
                                <img
                                    src={isShow ? close : open}
                                    onClick={() => setIsShow(prev => !prev)}
                                    className="register__input-eye"
                                    width="30px"
                                    alt="eye"
                                />
                            </div>
                        </div>

                        <div className="register__add-user">
                            <button
                                type="button"
                                className="register__add-user-btn"
                                disabled={user.users.length > 4}
                                onClick={addInputHandler}
                            >
                                Add another member
                            </button>
                        </div>

                        <div className="register__buttons">
                            <Link to="/">
                                <button
                                    className="register__btn register__btn-cancel"
                                >
                                    Cancel
                                </button>
                            </Link>
                            <button
                                className="register__btn register__btn-accept"
                                type="submit"
                            >
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Register;