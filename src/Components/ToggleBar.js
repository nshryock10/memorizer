import React, { useState, useEffect } from "react";
import './ToggleBar.css';

function ToggleBar(props) {

    const queue = props.queue;
    const handleLeftClick = props.handleLeftClick;
    const handleRightClick = props.handleRightClick;

  return (
    <div className="toggle-contaier">
        <button className='toggle-btn'onClick={handleLeftClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="chev bi bi-chevron-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
            </svg>
        </button>
        {queue && <span className="def-text">{queue}</span>}
        <button className='toggle-btn'onClick={handleRightClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="chev bi bi-chevron-right" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
            </svg>
        </button>
    </div>
  );
}

export default ToggleBar;