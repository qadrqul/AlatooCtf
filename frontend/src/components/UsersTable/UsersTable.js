import React, {useState} from 'react';
import deleteIcon from "../../assets/delete-icon.png";
import Modal from "../UI/Modal/Modal";

const UsersTable = ({userTable, users}) => {
    const [show, setShow] = useState(false);
    const [isDeleteTeam, setIsDeleteTeam] = useState(false);
    const [teamId, setTeamId] = useState(null);

    const openAlert = id => {
        setShow(true);
        setIsDeleteTeam(true);
        setTeamId(id);
    };

    return (
        <>
            <Modal
                show={show}
                isDeleteTeam={isDeleteTeam}
                teamId={teamId}
                closed={() => {
                    setIsDeleteTeam(false);
                    setShow(false);
                }}
            />

            <div className="table">
                <table>
                    <thead>
                    <tr>
                        <th>Email Address</th>
                        <th>Player / Team Name</th>
                        <th className="table__score">Practice Score</th>
                        <th className="table__date">Registered Date</th>
                        <th>Team Members</th>
                        {!userTable ? <th className="table__actions-th"></th> : null}
                    </tr>
                    </thead>
                    <tbody>
                    {
                        users?.length && users.map(user => {

                            return user.role !== "admin" && (
                                <tr key={user?._id}>
                                    <td className="table__sm">{user?.email}</td>
                                    <td className="table__s">{user?.teamName}</td>
                                    <td className="table__s">{user?.practicePoints}</td>
                                    <td>{new Date(user?.createdAt).toLocaleDateString()}</td>
                                    <td>
                                        {
                                            user.users?.map(us => (
                                                <p
                                                    key={us?._id}
                                                    className="table__subFields"
                                                >
                                                    <span>{`${us.username} ${us.lastname}`}</span>
                                                    <p>-</p>
                                                    <p>{us.email}</p>
                                                </p>
                                            ))
                                        }
                                    </td>
                                    {!userTable ? (
                                        <td className="table__actions">
                                            <img
                                                src={deleteIcon}
                                                alt="Удалить"
                                                width={15}
                                                onClick={() => openAlert(user._id)}
                                            />
                                        </td>
                                    ) : null}
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default UsersTable;