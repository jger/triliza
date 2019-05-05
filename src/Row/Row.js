import React from 'react';
import './Row.css'


const row = (props) => {


    return (

        <div className='Row'>
            {props.children}
        </div>


    )
};

export default (row);