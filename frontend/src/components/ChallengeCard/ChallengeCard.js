import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteChallenge} from "../../store/actions/challengesActions";
import checkmark from "../../assets/svg/checkmark.svg";

const ChallengeCard = ({isAdmin, challenge, onOpenEditModal, onOpenChallenge}) => {
    const dispatch = useDispatch();
    const solved = useSelector(state => state.users.user?.solvedPracticeChallenges);

    return (
        <div className="challenge" onClick={() => onOpenChallenge(challenge)}>
            <div className="challenge__top">
                <span>Challenge</span>
                <span>| {challenge.points} {challenge.points > 1 ? "points" : "point"}</span>
                {!isAdmin && solved.find(s => s === challenge._id) &&
                    <span className="challenge__solved">
                        <img
                            src={checkmark}
                            alt="checkmark"
                            className="challenge__checkmark"
                        />
                        Solved
                    </span>
                }
            </div>

            <div className="challenge__middle">
                <p className="challenge__title">
                    {challenge.title}
                </p>

                {
                    isAdmin && (
                        <div className="challenge__buttons">
                            <button
                                className="challenge__btn challenge__btn-edit"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onOpenEditModal(challenge)
                                }}
                            >
                                Edit
                            </button>
                            <button
                                className="challenge__btn challenge__btn-delete"
                                onClick={() => dispatch(deleteChallenge(challenge._id))}
                            >
                                Delete
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default ChallengeCard;