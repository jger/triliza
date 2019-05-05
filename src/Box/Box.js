import React from 'react';
import './Box.css'


const box = (props) => {


    return (

        <div className='Box' onClick={props.clicked}>
            {props.value}
        </div>


    )
};

export default (box);