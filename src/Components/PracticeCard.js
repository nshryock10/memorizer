import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    MicFill, 
    MicMuteFill,
    ArrowRepeat,
    PencilFill,
    BoxArrowRight} from 'react-bootstrap-icons';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import './PracticeCard.css';

function PracticeCard(props) {

    const [phase, setPhase] = useState('before') //options are before, during, after
    const [inputType, setInputType] = useState(null); //options are mic or keyboard
    const [speechSupported, setSpeechSupported] = useState(true);
    const [textInput, setTextInput] = useState('');
    const [editVoice, setEditVoice] = useState(false);
    //const [answer, setAnswer] = useState('');
    const microphoneRef = useRef(null);
    const { transcript, resetTranscript } = useSpeechRecognition();

    const transcriptRef = useRef(transcript);

    const handlePhaseChange = props.handlePhaseChange;
    const setAnswer = props.setAnswer;
    
    if(!SpeechRecognition.browserSupportsSpeechRecognition()){
        setSpeechSupported(false)
    }
    
    const handleListening = () => {
        SpeechRecognition.startListening({
            continuous: true,
        })
    };

    const stopHandle = () => {
        SpeechRecognition.stopListening();
    }

    const handleReset = () => {
        stopHandle();
        resetTranscript();
        setTextInput('')
    }

    const handleTextChange = () => {

    }

    const handleFinish = () => {
        //trigger PUT request
    }

    useEffect(() => {
        if(textInput){
            setPhase('after')
            setAnswer(textInput)
        }else{
            setPhase('before')
            setAnswer(textInput)
        }
        
    }, [textInput])

    //Review this block for use for editing voice dictation -------------- //
    useEffect(() => {
            transcriptRef.current = transcript
            setAnswer(transcript)
        
    }, [transcript])

    // -------------------------------------------------------------------- //

  return (
        <div className="practice-container">
       {!transcript &&
        <div className="input-container">
            <div className="text-container">
                <br/>
                <textarea 
                    className="text-input" 
                    type='text' 
                    placeholder={`Type or click the mic to dictate`}
                    onChange={target => setTextInput(target.target.value)}
                >
                </textarea>
            </div>
        </div>}
        {
            transcript &&
            !editVoice &&
            <div className="input-container">
                <div className="text-input"> 
                    <p>{transcript}</p> 
                </div>
            </div>
        }
        {
            transcript &&
            editVoice &&
            <div className="input-container">
                <div className="text-input"> 
                    <textarea 
                        ref={transcriptRef}
                        onChange={handleTextChange}
                        className="text-input" 
                    ></textarea> 
                </div>
            </div>
        }
        {
            phase === 'before' &&
            speechSupported &&
        
            <div className="btn-container">
                <button 
                    className="circle-button mic-btn"
                    ref={microphoneRef}
                    onClick={() => {
                        setPhase('during');
                        setInputType('mic')
                        handleListening()
                    }}
                >
                    <MicFill className='mic-btn-img' />
                </button>
            </div>
        }
        {
            phase === 'during' &&
            inputType === 'mic' &&
        
            <div className="btn-container">
                <button 
                    className="mute circle-button mic-btn"
                    onClick={() => {
                        if(transcript){
                            setPhase('after')
                            stopHandle()
                        }else{
                            setPhase('before')
                            stopHandle()
                        }
                    }}
                >
                    <MicMuteFill className="mic-btn-img" />
                </button>
            </div>
        }
        {
            phase === 'after' &&
        
            <div className="hrz-btn-container">
                <button 
                    className="sm-cir-button tertiary-btn"
                    onClick={() => {
                        setPhase('before')
                        handleReset()
                    }}
                >
                    <ArrowRepeat className="restart" />
                </button>
                <button 
                    className="sm-cir-button tertiary-btn"
                    onClick={() => {
                        setEditVoice(true)
                    }}
                >
                    <PencilFill className="edit" />
                </button>
                <button 
                    className="sm-cir-button tertiary-btn"
                    onClick={() => {
                        handlePhaseChange('review')
                        handleFinish()
                    }}
                >
                    <BoxArrowRight className="finish" />
                </button>
            </div>
        }
    </div>
  );
}

export default PracticeCard;