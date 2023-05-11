import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import progress from "../assets/svg/progress-tracker.svg";
import CategoryFilter from "../components/CategoryFilter/CategoryFilter";
import ChallengeCard from "../components/ChallengeCard/ChallengeCard";
import {fetchChallenges} from "../store/actions/challengesActions";
import Modal from "../components/UI/Modal/Modal";

const Practice = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);
    const challenges = useSelector(state => state.challenges.challenges);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchCategory, setSearchCategory] = useState("");
    const [challenge, setChallenge] = useState({});

    const [isChallengeTask, setIsChallengeTask] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        dispatch(fetchChallenges(`?category=${selectedCategory}&title=${searchCategory}&type=Practice`));
    }, [dispatch, selectedCategory, searchCategory]);

    const openChallenge = challenge => {
        setChallenge(challenge);
        setIsChallengeTask(true);
        setShow(true);
    };

    return (
        <>
            <Modal
                show={show}
                isChallenge={isChallengeTask}
                cData={challenge}
                closed={() => {
                    setShow(false);
                    setIsChallengeTask(false);
                }}
            />

            <div className="practice">
                {/*<div className="practice__page">*/}
                {/*    <div className="container-s">*/}
                {/*        <div className="practice__page-block">*/}
                {/*            <p className="practice__page-l">CTF Practice challenges</p>*/}
                {/*            <p className="practice__page-r">Challenges</p>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <div className="container-sm">
                    <div className="practice__info">
                        <div className="container-practice">
                            <div className="practice__info-block">
                                <p className="practice__info-l">Let's start {user.teamName}</p>
                                <p className="practice__info-r">Your Score: {user.practicePoints}</p>
                            </div>
                        </div>
                    </div>

                    {/*<div className="practice__progress">*/}
                    {/*    <img*/}
                    {/*        src={progress}*/}
                    {/*        alt="progress"*/}
                    {/*        className="practice__progress-icon"*/}
                    {/*    />*/}

                    {/*    <p className="practice__progress-title">Progress Tracker</p>*/}
                    {/*</div>*/}

                    <div className="practice__main">
                        <CategoryFilter
                            selectedCategory={selectedCategory}
                            searchCategory={searchCategory}
                            onChangeCategory={e => setSelectedCategory(e.target.value)}
                            onChangeSearch={e => setSearchCategory(e.target.value)}
                        />

                        <div className="practice__challenges">
                            {challenges.map(c =>
                                <ChallengeCard
                                    key={c._id}
                                    challenge={c}
                                    onOpenChallenge={openChallenge}
                                />
                            )}

                            {!challenges.length &&
                                <p className="practice__challenges-error">
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

export default Practice;