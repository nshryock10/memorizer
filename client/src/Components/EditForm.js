import React, { useState, useEffect } from "react";
import './EditForm.css';
import DropDown from "./DropDown";
import { PlusLg } from 'react-bootstrap-icons';
import { getCategories, addLegend, editLegend } from "../utils/api";

function EditForm (props) {

    const [queue, setQueue] = useState();
    const [category, setCategory] = useState();
    const [catId, setCatId] = useState();
    const [isLoading, setIsLoading] = useState();
    const [legend, setLegend] = useState(null);
    const [editData, setEditData] = useState(props.initialData)

    const setEdit = props.setEdit;
    const edit = props.edit;

    const handleChange = (e) => {
        const { name, value} = e.target;
        setEditData({...editData, [name]: value})
    }

    const handleSubmit = (e) => {

        if(!category || !catId || !queue || !legend){
            e.preventDefault();
            alert('Please fill out all fields')
            return;
        }else{
            editLegend(editData.id,  editData.queue, editData.legend)
        }
    }

    useEffect(() => {
        setIsLoading(true)
        if(editData){
            setQueue(editData.queue)
            setLegend(editData.legend)
            setCategory(editData.category)
            setCatId(editData.catId)
            setIsLoading(false)
        }
    }, [])

    if(isLoading){
        return(
            <div>
                <p>Loading...</p>
            </div>
        )
    }else{
        return(
            <div className="form-container">
                <form>
                    <label className="def-text label">Queue</label>
                    <br/>
                    <input
                        id='queue'
                        type='text'
                        name='queue'
                        required
                        value={editData ? editData.queue : null}
                        onChange={handleChange}
                    />
                    <br/>
                    <label className="def-text label">Key</label>
                    <br/>
                    <textarea
                        id='legend'
                        name='legend'
                        type='text'
                        required
                        value={editData ? editData.legend : null}
                        onChange={handleChange}
                    />
                    <button 
                            className="primary-button" 
                            onClick={()=> {setEdit(!edit)}}
                        >
                            Cancel
                        </button>
                    <button
                        type="submit"
                        className="primary-button"
                        onClick={e => handleSubmit(e)}
                    >Submit</button>
                </form>
            </div>
        )
    }

}

export default EditForm;