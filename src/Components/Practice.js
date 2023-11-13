import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import './Practice.css';

function Practice() {

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
    <div className="practice-container">
       {!transcript &&
        <div className="input-container">
            <div className="text-container">
                <textarea 
                    className="text-input" 
                    type='text' 
                    placeholder="Type or click the mic to dictate"
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
                        setPhase('after')
                        stopHandle()
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
        
            <div className="vrt-btn-container">
                <button 
                    className="primary-button"
                    onClick={() => {
                        setPhase('after')
                        handleFinish()
                    }}
                >
                    <Link className='link' to='/review'>
                        Finish
                    </Link>
                </button>
                <button 
                    className="primary-button"
                    onClick={() => {
                        setEditVoice(true)
                    }}
                >
                    Edit
                </button>
                <button 
                    className="primary-button"
                    onClick={() => {
                        setPhase('before')
                        handleReset()
                    }}
                >
                    Restart
                </button>
            </div>
        }
    </div>
  );
}

export default Practice;