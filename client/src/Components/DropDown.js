import React, { useEffect, useState } from "react";
import './LegendInput.css';

function DropDown (props) {

    const options = props.options;
    const choice = props.choice;
    const setChoice = props.setChoice;

    if(options){
    return (
        <select
            value={choice}
            onChange={(e) => {setChoice(e.currentTarget.value)}}
        >
        <option
            value='Select from drop down'
            key='A'
            disabled
        >
            Select from drop down
        </option>
        {
            options && 
            options.map( (option, index) => {
                return(
                    <option
                        key={option.id}
                        value={option.category}
                    >
                        {option.category}
                    </option>
                )
            })
        }
   </select>
    )
    }else{
        return(
            <div>
                <p>Loading...</p>
            </div>
        )
    }

}

export default DropDown;