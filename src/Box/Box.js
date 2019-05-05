import React from 'react';
import './Box.css'


const box = (props) => {

    let className = (props.value!=='X' && props.value!=='O') ? 'Box free':'Box';

    return (

        <div className={className} onClick={props.clicked}>
            {props.value}
        </div>


    )
};

export default (box);