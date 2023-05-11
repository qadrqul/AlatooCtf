import React from 'react';

const Backdrop = ({show, clicked}) => {
    return show ? <div className="Backdrop" onClick={clicked} /> : null;
};

export default Backdrop;