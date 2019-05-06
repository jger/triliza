import React from 'react';


const newgame = (props) => {

    return (
        <div>
            <button onClick={props.resetGame}>New Game</button>
        </div>

    )
};

export default (newgame);