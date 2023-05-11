import React, {useEffect, useState} from 'react';
import progress from "../assets/svg/progress-tracker.svg";
import ScoreTable from "../components/ScoreTable/ScoreTable";
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers} from "../store/actions/usersActions";
import {fetchCompetitions} from "../store/actions/competitionsActions";

const ScoreBoard = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.users);
    const competitions = useSelector(state => state.competitions.competitions);
    const [isCompetitionTab, setIsCompetitionTab] = useState(false);
    const [currentName, setCurrentName] = useState("");

    useEffect(() => {
        dispatch(fetchUsers("?filter=score"));
        dispatch(fetchCompetitions());
    }, [dispatch]);

    const changeTab = name => {
        const title = name.innerText;

        if (title === "Practice") return setIsCompetitionTab(false);

        setCurrentName(title);
        setIsCompetitionTab(true);
    };

    return (
        <div className="score-board">
            {/*<div className="score-board__page">*/}
            {/*    <div className="container-sm">*/}
            {/*        <p>Score Board</p>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <div className="container-sm">
                <div className="score-board__ranking">
                    <img
                        src={progress}
                        alt="progress"
                        className="score-board__ranking-icon"
                    />

                    <p className="score-board__ranking-title">Ranking</p>
                </div>

                <div className="score-board__tabs">
                    <ul>
                        <li onClick={e => changeTab(e.target)}>Practice</li>

                        {competitions.map(c => (
                            <li key={c._id} onClick={e => changeTab(e.target)}>{c.title}</li>
                        ))}
                    </ul>
                </div>

                <ScoreTable
                    users={users}
                    isCompetitionTab={isCompetitionTab}
                    competitionName={currentName}
                />
            </div>
        </div>
    );
};

export default ScoreBoard;