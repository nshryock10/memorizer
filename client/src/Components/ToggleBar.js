import React, { useState, useEffect } from "react";
import {
    ChevronLeft,
    ChevronRight} from 'react-bootstrap-icons';
import './ToggleBar.css';

function ToggleBar(props) {

    const queue = props.queue;
    const handleLeftClick = props.handleLeftClick;
    const handleRightClick = props.handleRightClick;
    const id = props.id;
    const length = props.length;

  return (
    <div className="toggle-contaier">
        <button className='toggle-btn'onClick={handleLeftClick}>
            <ChevronLeft className="chev" />
        </button>
        {queue && <span className="def-text">{`${queue} ${id}/${length}`}</span>}
        <button className='toggle-btn'onClick={handleRightClick}>
            <ChevronRight className="chev" />
        </button>
    </div>
  );
}

export default ToggleBar;