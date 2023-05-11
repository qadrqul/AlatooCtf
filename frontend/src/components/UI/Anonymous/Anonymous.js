import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {DownOutlined, UserOutlined} from "@ant-design/icons";
import {Dropdown, Space} from "antd";
import {logoutUser} from "../../../store/actions/usersActions";


const Anonymous = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);
    const [items, setItems] = useState([]);

    const onLogout = async () => {
        await dispatch(logoutUser());
    }


    // const matches = useMediaQuery({ maxWidth: 768 });


    useEffect(() => {
        if (user?.role === "admin") {
            setItems([
                {
                    label: <Link to="/admin-practice">Challenges</Link>,
                    key: '0'
                },
                {
                    label: <Link to="/admin-teams">Teams</Link>,
                    key: '1',
                },
                {
                    label: <Link to="/admin-competitions">Competitions</Link>,
                    key: '2',
                },
                {
                    label: <Link to="/admin-banners">Banners</Link>,
                    key: '3',
                },
                {
                    label: <p onClick={onLogout}>Logout</p>,
                    key: '4',
                }
            ]);
        } else {
            setItems([
                {
                    label: <p onClick={onLogout}>Logout</p>,
                    key: '0',
                }
            ]);
        }
    }, [user?.role]);

    return (
        <ul className="header__menu">
            {
                !user ?
                    <>
                        <Link to="/login">
                            <li>
                                Sign In
                            </li>
                        </Link>

                        <Link to="/register">
                            <li>
                                Sign Up
                            </li>
                        </Link>
                    </>
                    :
                    <Dropdown menu={{items}} trigger={['click']}>
                        <li
                            onClick={(e) => e.preventDefault()}
                            className="header__dropdown"
                        >
                            <Space>
                                <p className="header__dropdown-user">{user.teamName}</p>
                                <UserOutlined/>
                                <DownOutlined/>
                            </Space>
                        </li>
                    </Dropdown>

            }

        </ul>
    );
};

export default Anonymous;
