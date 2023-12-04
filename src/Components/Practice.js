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
    const [phase, setPhase] = useState('input')

    useEffect(() => {
        setIsLoading(true)
        getCards();
        console.log(cards)
    },[])

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
                    handleRightClick={handleRightClick}  
                    handleLeftClick={handleLeftClick}
                />
                {phase === 'input' && 
                    <PracticeCard 
                        queue={cards[cardIndex].queue} 
                        handlePhaseChange={handlePhaseChange}
                    />
                }
                {phase === 'review' && 
                    <Review 
                        handlePhaseChange={handlePhaseChange}
                    />
                }

            </div>)
        }
    </div>
  );
}

export default Practice;