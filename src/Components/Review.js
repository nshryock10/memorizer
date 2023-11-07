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

    useEffect(() => {
        console.log(legend)
        
    }, [answer, legend]) 

    const getResults = async () => {

        const setResults = (ans, leg) => {
            console.log(leg)
            console.log(ans)
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
        console.log(legend);
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
                    {legend !== null && legend.map( word => {
                        return(
                            <span className={word.className}>{word.word}</span>
                        )
                    })}
                </div>
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