import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers} from "../store/actions/usersActions";
import UsersTable from "../components/UsersTable/UsersTable";

const AdminTeams = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch])

    return (
        <div className="admin-teams">
            {/*<div className="admin-teams__page">*/}
            {/*    <div className="container-sm">*/}
            {/*        <p>List of Players/Teams</p>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div className="container-sm">
                <UsersTable users={users} userTable={false}/>
            </div>
        </div>
    );
};

export default AdminTeams;