import React from 'react';

const ScoreTable = ({ users, isCompetitionTab, competitionName }) => {
    const currentUsers = users?.filter(user => user.role !== "admin");
    return (
        <div className="table">
            <table>
                <thead>
                <tr>
                    <th>Rank</th>
                    <th>Team Name</th>
                    <th>Score</th>
                </tr>
                </thead>
                <tbody>
                {
                    currentUsers?.length && currentUsers.map((user, idx) => {
                        const competitionIdx = user.competitionsPoints.findIndex(comp => comp.title === competitionName);
                        const comp = user.competitionsPoints[competitionIdx];

                        // eslint-disable-next-line array-callback-return
                        if (!comp && isCompetitionTab) return;

                        return (
                            <tr key={user?._id} className="table__scoreboard">
                                <td className="table__sm">{idx + 1}</td>
                                <td className="table__s">{user?.teamName}</td>
                                <td className="table__s">{isCompetitionTab ? comp.points : user?.practicePoints}</td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
        </div>
    );
};

export default ScoreTable;