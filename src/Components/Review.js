import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { scoreAnswer } from '../utils/utils';
import { ChevronDown, ChevronUp } from 'react-bootstrap-icons';
import classNames from "classnames";
import './Review.css';

function Review(props) {

    const [accuracy, setAccuracy] = useState(0);
    const [colorLegend, setColorLegend] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [legend, setLegend] = useState(props.legend);
    const [showAnswer, setShowAnswer] = useState(false);
    const [answer, setAnswer] = useState(props.answer);
    const [colorAnswer, setColorAnswer] = useState();

    const handlePhaseChange = props.handlePhaseChange;

    // use effect 
    // async get request for the user answer and legend
    // once data, run review algorithm
    // map completed answer
    useEffect(() => {
        setIsLoading(true);
        getResults();
    }, [])

    const handleTryAgain = () => {
        //trigger server request to remove answer from server
        alert('Are you sure you want to try again?')
    }

    const getResults = async () => {

        const setResults = (ans, leg) => {

            const results = scoreAnswer(ans, leg)
            setColorAnswer(results[0]);
            setColorLegend(results[1]);
            setAccuracy(results[2]);
        }
        //replace with api request
        const leg =  legend;
        const ans =  answer;

        setResults(ans, leg);
        setIsLoading(false);
    }

    const handleShowClick = () => {
        const current = !showAnswer;
        setShowAnswer(current)
    }

    const displayAnswer = classNames('show-answer', {
        open: showAnswer
    })

  return (
    <div>
        {   answer &&
            colorLegend &&
            !isLoading &&
        <div className="review-container">
            <div className="accuracy-val">
                <p>{`${accuracy}%`}</p>
            </div>
            <div className="review-text-container">
                <div className="review-text"> 
                    {legend !== null && colorLegend.map( (word, index) => {
                        return(
                            <span key={index} className={word.className ? word.className : 'null'}>{word.word}</span>
                        )
                    })}
                </div>
            </div>
            <span onClick={handleShowClick} className="show">Show Answer {showAnswer ?
             <ChevronDown className="sm-chev down-chev"/> :
             <ChevronDown className="sm-chev up-chev"/>}</span>
            {colorAnswer &&
                <div className={displayAnswer}>
                        {answer !== null  && colorAnswer.map( (word, index) => {
                            return(
                                    <span key={index} className={`${word.className ? word.className : 'null'} ${displayAnswer}`}>{word.word}</span>
                            )
                        })}
                </div>
            }
            <div className="vrt-btn-container height">
                <button className="primary-button" onClick={() => handlePhaseChange('input')}>
                    Try Again
                </button>
                <button className="primary-button" onClick={props.handleRightClick}>
                    Next
                </button>
                {
                    props.id === props.length &&
                    <button className="primary-button" onClick={props.handleRightClick}>
                    <Link className="link" to='/'> Finish </Link>
                </button>
                }
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