import React, {useEffect, useState} from 'react';
import Modal from "../components/UI/Modal/Modal";
import {useDispatch, useSelector} from "react-redux";
import CompetitionCard from "../components/CompetitionCard/CompetitionCard";
import {fetchCompetitions} from "../store/actions/competitionsActions";

const AdminCompetitions = () => {
    const dispatch = useDispatch();
    const competitions = useSelector(state => state.competitions.competitions);
    const [show, setShow] = useState(false);
    const [createNewCompetition, setCreateNewCompetition] = useState(false);

    const openCreateModal = () => {
        setCreateNewCompetition(true);
        setShow(true);
    };

    useEffect(() => {
        dispatch(fetchCompetitions());
    }, [dispatch])

    return (
        <>
            <Modal
                show={show}
                createNewCompetition={createNewCompetition}
                closed={() => {
                    setShow(false);
                    setCreateNewCompetition(false);
                }}
            />

            <div className="admin-competitions">
                {/*<div className="admin-competitions__page">*/}
                {/*    <div className="container-sm">*/}
                {/*        <p>List of competitions history</p>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <div className="container-sm">
                    <div className="admin-competitions__info">
                        <div className="container-practice">
                            <div className="admin-competitions__info-block">
                                <p>Competitions</p>
                                <button
                                    className="admin-competitions__new-btn"
                                    onClick={openCreateModal}
                                >
                                    Add New
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="admin-competitions__main">
                       <div className="admin-competitions__cards">
                            {competitions.map(c =>
                                <CompetitionCard
                                    key={c._id}
                                    competition={c}
                                />
                            )}

                            {!competitions.length &&
                                <p className="admin-practice__challenges-error">
                                    Unfortunately, there are no competitions, come back later!
                                </p>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminCompetitions;