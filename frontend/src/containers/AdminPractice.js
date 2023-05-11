import React, {useEffect, useState} from 'react';
import progress from "../assets/svg/progress-tracker.svg";
import Modal from "../components/UI/Modal/Modal";
import {useDispatch, useSelector} from "react-redux";
import {fetchChallenges} from "../store/actions/challengesActions";
import ChallengeCard from "../components/ChallengeCard/ChallengeCard";
import CategoryFilter from "../components/CategoryFilter/CategoryFilter";

const AdminPractice = () => {
    const dispatch = useDispatch();
    const challenges = useSelector(state => state.challenges.challenges);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchCategory, setSearchCategory] = useState("");
    const [challenge, setChallenge] = useState();

    const [isChallengeTask, setIsChallengeTask] = useState(false);
    const [createChallenge, setCreateChallenge] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [show, setShow] = useState(false);


    useEffect(() => {
        dispatch(fetchChallenges(`?category=${selectedCategory}&title=${searchCategory}&type=Practice`));
    }, [dispatch, selectedCategory, searchCategory]);

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

    return (
        <>
            <Modal
                show={show}
                createNewChallenge={createChallenge}
                isChallenge={isChallengeTask}
                cData={challenge}
                isEdit={isEdit}
                closed={() => {
                    setShow(false);
                    setIsEdit(false);
                    setIsChallengeTask(false);
                    setCreateChallenge(false);
                }}
            />

            <div className="admin-practice">
                {/*<div className="admin-practice__page">*/}
                {/*    <div className="container-sm">*/}
                {/*        <div className="admin-practice__page-block">*/}
                {/*            <p className="admin-practice__page-l">CTF Practice challenges</p>*/}
                {/*            <p className="admin-practice__page-r">Challenges</p>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <div className="container-lg">
                    <div className="admin-practice__empty-block"/>

                    <div className="admin-practice__progress-block">
                        <div>
                            <p className="admin-practice__progress-title">Challenges</p>
                        </div>

                        <button
                            className="admin-practice__new-challenge-btn"
                            onClick={() => {
                                setShow(true);
                                setCreateChallenge(true);
                            }}
                        >
                            Add New
                        </button>
                    </div>

                    <div className="admin-practice__main">
                        <CategoryFilter
                            selectedCategory={selectedCategory}
                            searchCategory={searchCategory}
                            onChangeCategory={e => setSelectedCategory(e.target.value)}
                            onChangeSearch={e => setSearchCategory(e.target.value)}
                        />

                        <div className="admin-practice__challenges">
                            {challenges.map(c =>
                                <ChallengeCard
                                    key={c._id}
                                    challenge={c}
                                    isAdmin
                                    onOpenEditModal={openEditChallengeModal}
                                    onOpenChallenge={openChallenge}
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
            </div>
        </>
    );
};

export default AdminPractice;