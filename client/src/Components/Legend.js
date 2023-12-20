import React from "react";
import './Legend.css'
import { XLg } from "react-bootstrap-icons";

function Legend (props) {

    const open = props.open;
    const setOpen = props.setOpen;
    const queue = props.queue;
    const legend = props.legend;

    return (
        <div className="leg-container">
            <button
                className="close-btn"
                onClick={() => setOpen(!open)}
            >Close <XLg className="x" /></button>
            { legend && queue ? 
            <div className="leg-text-container">
                <h1>{queue}</h1>
                <p className="def-text">{legend}</p>
                <br/>
                <br/>
                <button className="primary-button">Edit</button>
            </div> :
            <p>Loading....</p>
            }
            
        </div>
    )

}

export default Legend