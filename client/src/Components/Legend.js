import React, { useState } from "react";
import './Legend.css'
import { XLg } from "react-bootstrap-icons";
import EditForm from "./EditForm";

function Legend (props) {

    const open = props.open;
    const setOpen = props.setOpen;
    const catId = props.catId;
    const id = props.id;
    const queue = props.queue;
    const legend = props.legend;
    const category = props.category;

    const [edit, setEdit] = useState(false)

    return (
        <div className="leg-container">
            {!legend && <p>Loading....</p>}
            {!edit &&
                <button
                    className="close-btn"
                    onClick={() => setOpen(!open)}
                >
                    Close <XLg className="x" />
                </button>
            }
            { legend && queue && !edit &&
                <div className="leg-text-container">
                    <h1>{queue}</h1>
                    <p className="def-text">{legend}</p>
                    <br/>
                    <br/>
                    <button 
                        className="primary-button"  
                        onClick={() => setEdit(!edit)}
                    >Edit</button>
                </div> 
            }
            {legend && queue && edit &&
                <EditForm
                    initialData = {{
                        catId,
                        category,
                        id,
                        queue,
                        legend,
                    }}
                    edit={edit}
                    setEdit={setEdit}
                />
            }
            
        </div>
    )

}

export default Legend