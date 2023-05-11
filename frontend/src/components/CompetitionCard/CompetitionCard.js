import React from 'react';
import {useDispatch} from "react-redux";
import {historyPush} from "../../store/actions/historyActions";

const CompetitionCard = ({competition}) => {
    const dispatch = useDispatch();
    const classes = ["competition__started"];

    if (competition.isStarted) {
        classes.push("competition__started-y");
    } else {
        classes.push("competition__started-n");
    }

    const redirectTo = async () => {
          await dispatch(historyPush("/competitions/" + competition._id));
    };

    return (
        <div className="competition-card" onClick={redirectTo}>
            <div className="competition-card__top">
                <span>Cryptography</span>
                <span>| {competition.maxTeams} {competition.maxTeams > 1 ? "teams" : "team"} </span>

                <span className={classes.join(" ")}>
                    {competition.isStarted ? "Started" : "Closed"}
                </span>
            </div>

            <p className="competition-card__title">
                {competition.title}
            </p>
        </div>
    );
};

export default CompetitionCard;