import React from 'react';
import logo from "../../../assets/logo.png";
import {Link} from "react-router-dom";
import Anonymous from "../Anonymous/Anonymous";
import {useSelector} from "react-redux";

const Header = () => {
    const user = useSelector(state => state.users.user);

    return (
        <div className="header">
            <div className="container-sm">
                <div className="header__block">
                    <Link to="/" className="header__link">
                        <div className="header__logo">
                            <img
                                src={logo}
                                alt="CTF"
                                className="header__logo-logo"
                            />
                            <h6 className="header__logo-text">VOIDBOX</h6>
                        </div>
                    </Link>
                    <div className="header__list">
                        <ul>
                            {user ?
                                <>
                                    <Link to="/practice">
                                        <li>Challenges</li>
                                    </Link>
                                    <Link to="/enter-competition">
                                        <li>Events</li>
                                    </Link>
                                    <Link to="/score-board">
                                        <li className="header__list-last">Leaderboard</li>
                                    </Link>
                                </> : null
                            }
                        </ul>

                    </div>

                    <Anonymous/>
                </div>
            </div>
        </div>
    );
};

export default Header;