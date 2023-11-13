import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { getAnswer, getLegend, scoreAnswer } from '../utils/utils';
import './Review.css';

function Review() {

    const [accuracy, setAccuracy] = useState(0);
    const [answer, setAnswer] = useState(null);
    const [legend, setLegend] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // use effect 
    // async get request for the user answer and legend
    // once data, run review algorithm
    // map completed answer
    useEffect(() => {
      
        setIsLoading(true);
        getResults();

    }, [])

    const getResults = async () => {

        const setResults = (ans, leg) => {

            const results = scoreAnswer(ans, leg)
            setLegend(results[0]);
            setAnswer(results[1]);
            setAccuracy(results[2]);
        }
        //replace with api request
        const leg =  getLegend();
        const ans =  getAnswer();
        
        setResults(ans, leg);
        setIsLoading(false);
    }

  return (
    <div>
        {   answer &&
            legend &&
            !isLoading &&
        <div className="review-container">
            <div className="accuracy-val">
                <p>{`${accuracy}%`}</p>
            </div>
            <div className="review-text-container">
                <div className="review-text"> 
                    {legend !== null && legend.map( (word, index) => {
                        return(
                            <span key={index} className={word.className}>{word.word}</span>
                        )
                    })}
                </div>
            </div>
            <div className="vrt-btn-container height">
                <button className="primary-button">Try again</button>
                <button className="primary-button">Next</button>
            </div>
        </div>
        }
        {
            !answer &&
            !legend &&

            <div>
                <p>Loading...</p>
            </div>
        }
    </div>
    
  );
}

export default Review;