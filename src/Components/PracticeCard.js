import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import './PracticeCard.css';

function PracticeCard(props) {

    const [phase, setPhase] = useState('before') //options are before, during, after
    const [inputType, setInputType] = useState(null); //options are mic or keyboard
    const [speechSupported, setSpeechSupported] = useState(true);
    const [textInput, setTextInput] = useState('');
    const [editVoice, setEditVoice] = useState(false);
    const [answer, setAnswer] = useState('');
    const microphoneRef = useRef(null);
    const { transcript, resetTranscript } = useSpeechRecognition();

    const transcriptRef = useRef(transcript);
    
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
        console.log(answer)
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
        
            console.log(transcriptRef.current)
            transcriptRef.current = transcript
            setAnswer(transcript)
        
    }, [transcript])

    // -------------------------------------------------------------------- //


  return (
    <div>
        {phase !== 'review' &&
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mic-btn-img bi bi-mic-fill" viewBox="0 0 16 16">
                        <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z"/>
                        <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
                    </svg>
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mic-btn-img bi bi-mic-mute-fill" viewBox="0 0 16 16">
                        <path d="M13 8c0 .564-.094 1.107-.266 1.613l-.814-.814A4.02 4.02 0 0 0 12 8V7a.5.5 0 0 1 1 0v1zm-5 4c.818 0 1.578-.245 2.212-.667l.718.719a4.973 4.973 0 0 1-2.43.923V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 1 0v1a4 4 0 0 0 4 4zm3-9v4.879L5.158 2.037A3.001 3.001 0 0 1 11 3z"/>
                        <path d="M9.486 10.607 5 6.12V8a3 3 0 0 0 4.486 2.607zm-7.84-9.253 12 12 .708-.708-12-12-.708.708z"/>
                    </svg>
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
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="restart bi bi-arrow-repeat" viewBox="0 0 16 16">
                        <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                        <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
                    </svg>
                </button>
                <button 
                    className="sm-cir-button tertiary-btn"
                    onClick={() => {
                        setEditVoice(true)
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="edit bi bi-pencil-fill" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                    </svg>
                </button>
                <button 
                    className="sm-cir-button tertiary-btn"
                    onClick={() => {
                        setPhase('review')
                        handleFinish()
                    }}
                >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="finish bi bi-box-arrow-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                            <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                        </svg>
                </button>
            </div>
        }
    </div>}
    {phase === 'review' &&
        <div className='practice-container review-card'>
            <p>Reviewing....</p>
        </div>
    }
    </div>
  );
}

export default PracticeCard;