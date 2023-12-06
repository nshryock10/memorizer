import React, { useState, useEffect } from "react";
import PracticeCard from "./PracticeCard";
import ToggleBar from "./ToggleBar";
import './Practice.css';
import { getLegend } from "../utils/utils";
import Review from "./Review";

function Practice() {

    const [cards, setCards] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [cardIndex, setCardIndex] = useState();
    const [phase, setPhase] = useState('input');
    const [answer, setAnswer] = useState();
    const [legend, setLegend] = useState();
    const [queue, setQueue] = useState();

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

    const updateIndex = async () => {

        const setInputs = (leg, q) => {
            setLegend(leg)
            setQueue(q)
        }
        
        const legend = cards[cardIndex].legend;
        const queue = cards[cardIndex].queue;
        setInputs(legend, queue)
    }

    const getCards = async () => {

        const setCardArry = (data) => {
            const cardData = data;
            setCards(cardData);
        }

        const cardArry = await getLegend();
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
                    />
                }
                {phase === 'review' && 
                    <Review 
                        key={legend}
                        legend={legend}
                        answer={answer}
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