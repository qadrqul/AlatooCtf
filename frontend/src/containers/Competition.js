import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchOneCompetition} from "../store/actions/competitionsActions";
import Modal from "../components/UI/Modal/Modal";
import {fetchChallenges} from "../store/actions/challengesActions";
import ChallengeCard from "../components/ChallengeCard/ChallengeCard";

const Competition = ({match}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);
    const challenges = useSelector(state => state.challenges.challenges);
    const competition = useSelector(state => state.competitions.competition);

    const [title, setTitle] = useState("");
    const [challenge, setChallenge] = useState();
    const [isChallengeTask, setIsChallengeTask] = useState(false);
    const [createChallenge, setCreateChallenge] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [wantToStart, setWantToStart] = useState(false);
    const [wantToEnd, setWantToEnd] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        dispatch(fetchOneCompetition(match.params.id));
    }, [dispatch, match.params.id]);

    useEffect(() => {
        dispatch(fetchChallenges(`?type=Competition&competition=${match.params.id}`));
    }, [dispatch, match.params.id]);

    useEffect(() => {
        if (competition) {
            setTitle(competition.title);
        }
    }, [competition]);

    const classesOfButton = ["competition__btn"];
    if (competition?.isStarted) classesOfButton.push("competition__btn-end");
    if (!competition?.isStarted) classesOfButton.push("competition__btn-start");

    const openCreateChallenge = () => {
        setCreateChallenge(true);
        setShow(true);
    };

    const openEditChallengeModal = challenge => {
        setChallenge(challenge);
        setCreateChallenge(true);
        setIsEdit(true);
        setShow(true);
    };

    const openChallenge = challenge => {
        setChallenge(challenge);
        setIsChallengeTask(true);
        setShow(true);
    };

    const openSetPassword = e => {
        if (e.target.innerText === "Start the competition") {
            setWantToStart(true);
        } else {
            setWantToEnd(true);
        }

        setShow(true);
    };

    return (
        <>
            <Modal
                show={show}
                createNewChallenge={createChallenge}
                isChallenge={isChallengeTask}
                cData={challenge}
                isEdit={isEdit}
                competitionId={match.params.id}
                wantToStart={wantToStart}
                wantToEnd={wantToEnd}
                closed={() => {
                    setShow(false);
                    setCreateChallenge(false);
                    setIsEdit(false);
                    setIsChallengeTask(false);
                    setWantToStart(false);
                    setWantToEnd(false);
                }}
            />

            <div className="competition">
                {/*<div className="competition__page">*/}
                {/*    <div className="container-sm">*/}
                {/*        <div className="competition__page-block">*/}
                {/*            <p>Welcome To CTF Competition</p>*/}
                {/*            <p>Challenges</p>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <div className="container-sm">
                    <div className="admin-competitions__info">
                        <div className="container-practice">
                            <div className="admin-competitions__info-block">
                                <p>Competition Challenges</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-xs">
                    <div className="competition__top">
                        <div className="competition__title">
                            <label>Name of the competition</label>
                            <input
                                name="title"
                                className="competition__title-input"
                                type="text"
                                maxLength={50}
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                readOnly={user.role !== "admin"}
                                required
                            />
                        </div>

                        {user.role === "admin" &&
                            <div className="competition__buttons">
                                <button
                                    className="competition__btn competition__btn-new"
                                    onClick={openCreateChallenge}
                                >
                                    Add new challenge
                                </button>
                                <button className={classesOfButton.join(" ")} onClick={openSetPassword}>
                                    {!competition?.isStarted && "Start the competition"}
                                    {competition?.isStarted && "End the competition"}
                                </button>
                            </div>
                        }
                    </div>

                    <div className="competition__challenges">
                        {challenges.map(c =>
                            <ChallengeCard
                                key={c._id}
                                challenge={c}
                                isAdmin={user.role === "admin"}
                                onOpenEditModal={openEditChallengeModal}
                                onOpenChallenge={openChallenge}
                                compCard
                            />
                        )}

                        {!challenges.length &&
                            <p className="admin-practice__challenges-error">
                                Unfortunately, there are no tasks, come back later!
                            </p>
                        }
                    </div>
                </div>
            </div>

        </>
    );
};

export default Competition;