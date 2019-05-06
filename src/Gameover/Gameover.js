import React from 'react';


const gameover = (props) => {

    return (

        <div>
            <h4>
                { props.scoreO===props.scoreX ? 'Tie' : props.scoreO>props.scoreX ? 'O wins the game!' : 'X wins the game!'}
            </h4>
            <h3>Game Over!</h3>
        </div>

    )
};

export default (gameover);