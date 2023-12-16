import React, { useState, useEffect } from "react";
import PracticeCard from "./PracticeCard";
import ToggleBar from "./ToggleBar";
import './Practice.css';
import Review from "./Review";
import { getLegends, updateAnswer } from "../utils/api";

function Practice() {

    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [cardIndex, setCardIndex] = useState();
    const [phase, setPhase] = useState('input');
    const [answer, setAnswer] = useState();
    const [accuracy, setAccuracy] = useState(); 
    const [legend, setLegend] = useState();
    const [legendId, setLegendId] = useState();

    useEffect(() => {
        setIsLoading(true)
        getCards();
    },[])

    useEffect(() => {
        
        if(cards && cardIndex >= 0){
            updateIndex();
            setPhase('input')
        }

    }, [cardIndex])

    useEffect(() => { 
        console.log(`accuracy updated ${accuracy}`)
        if(accuracy >= 0){
            console.log(`Write acc ${accuracy} to db`)
            handleFinish()
        }
    }, [accuracy])

    const updateIndex = async () => {

        const setInputs = (leg, id) => {
            setLegend(leg)
            setLegendId(id)
        }
        
        const legend = cards[cardIndex].legend;
        const id = cards[cardIndex].id;
        setInputs(legend, id)
    }

    const getCards = async () => {

        const setCardArry = (data) => {
            const cardData = data;
            setCards(cardData);
        }

        const cardArry = await getLegends(1); //getQueues()
        setCardArry(cardArry);
        setCardIndex(0)
        setIsLoading(false);
    }

    const handleLeftClick = () => {
        const currIndex = cardIndex;
        if(currIndex > 0){
            setCardIndex(currIndex - 1)
        }else if(currIndex === 0){
            setCardIndex(cards.length - 1)
        }
    }

    const handleRightClick = () => {
        const currIndex = cardIndex;
        if(cardIndex < cards.length - 1){
            setCardIndex(currIndex + 1)
        }else if(cardIndex === cards.length - 1){
            setCardIndex(0)
        }
    }

    const handlePhaseChange = phaseChange => {
        setPhase(phaseChange)
    }

    const handleFinish = async () => {
        //trigger PUT request
        const success = await updateAnswer(legendId, answer, accuracy)
        console.log(success);
    }

  return (
    <div>
        { isLoading && <p className='text-input'>Loading...</p> }
        { cardIndex >= 0 &&
            (<div>
                <ToggleBar 
                    queue={cards[cardIndex].queue} 
                    length={cards.length}
                    id={cardIndex + 1}
                    handleRightClick={handleRightClick}  
                    handleLeftClick={handleLeftClick}
                />
                {phase === 'input' && 
                    <PracticeCard 
                        queue={cards[cardIndex].queue} 
                        setAnswer={setAnswer}
                        handlePhaseChange={handlePhaseChange}
                        handleFinish={handleFinish}
                    />
                }
                {phase === 'review' && 
                    <Review 
                        key={legend}
                        legend={legend}
                        answer={answer}
                        accuracy={accuracy}
                        setAccuracy={setAccuracy}
                        length={cards.length}
                        id={cardIndex + 1}
                        handleRightClick={handleRightClick}
                        handlePhaseChange={handlePhaseChange}
                    />
                }

            </div>)
        }
    </div>
  );
}

export default Practice;