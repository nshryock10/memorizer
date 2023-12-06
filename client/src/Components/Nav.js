import React from 'react';
import {HouseDoor} from 'react-bootstrap-icons'
import { Link } from 'react-router-dom';


function Nav () {

    const containerStyle = {
        backgroundColor: 'rgb(85, 159, 202)',
        height: '50px',
        position: 'fixed',
        width: '100%',
        boxSizing: 'border-box',
        top: 0,
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

    const buttonStyle = {
        height: '45px',
        width: '45px',
        backgroundColor: 'rgb(85, 159, 202)',
        margin: 0,
        border: 'none',
    }

    const iconStyle = {
        height: '35px',
        width: '35px',
        color: 'rgb(237, 237, 237)'
    }

    return(
        <div style={containerStyle}>
            <button style={buttonStyle} >
                <Link to='/'>
                    <HouseDoor style={iconStyle} />
                </Link>
            </button>
        </div>
    )

}

export default Nav