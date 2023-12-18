import React from "react";
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
        <div className="vrt-btn-container">
            <button className="primary-button">
                <Link to='practice' className='link'>
                    Practice
                </Link>
            </button>
            <button className="primary-button">
              <Link to='add' className="link" >
                Add
              </Link>
            </button>
            <button className="primary-button">Library</button>
        </div>
    </div>
  );
}

export default Home;