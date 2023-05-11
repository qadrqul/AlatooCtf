import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {enterCompetition} from "../store/actions/competitionsActions";

const EnterCompetition = () => {
    const dispatch = useDispatch();
    const [password, setPassword] = useState("");

    const enter = () => {
        dispatch(enterCompetition(password));
    };

    return (
        <div className="enter-competition">
            {/*<div className="enter-competition__page">*/}
            {/*    <div className="container-sm">*/}
            {/*        <p/>*/}
            {/*    </div>*/}
            {/*</div>*/}

            {/*<div className="container-sm">*/}
            {/*    <div className="enter-competition__info">*/}
            {/*        <div className="container-practice">*/}
            {/*            <div className="enter-competition__info-block">*/}
            {/*                <p>Please enter password to enter the competition</p>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*    <div className="enter-competition__input-block">*/}
            {/*        <input*/}
            {/*            name="password"*/}
            {/*            className="enter-competition__input"*/}
            {/*            value={password}*/}
            {/*            onChange={e => setPassword(e.target.value)}*/}
            {/*            maxLength={10}*/}
            {/*            required*/}
            {/*        />*/}
            {/*    </div>*/}

            {/*    <div className="enter-competition__button-block">*/}
            {/*        <button*/}
            {/*            className="enter-competition__enter"*/}
            {/*            onClick={enter}*/}
            {/*        >*/}
            {/*            Enter*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <p className="enter-competition-error">
                Unfortunately, there are no competitions, come back later!
            </p>
        </div>

    );
};

export default EnterCompetition;