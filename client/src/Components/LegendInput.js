import React, { useState, useEffect } from "react";
import './LegendInput.css';
import DropDown from "./DropDown";
import { PlusLg } from 'react-bootstrap-icons';
import { getCategories, addLegend } from "../utils/api";

function LegendInput () {

    const [queue, setQueue] = useState();
    const [category, setCategory] = useState('Select from drop down');
    const [categories, setCategories] = useState();
    const [catId, setCatId] = useState();
    const [isLoading, setIsLoading] = useState();
    const [legend, setLegend] = useState(null);
    const [newCat, setNewCat] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        setCategoryOptions()
    }, [])

    useEffect(() => {   
        if(categories){
            for(let i=0; i < categories.length; i++){
                if(categories[i].category === category){
                    setCatId(categories[i].id)
                }
            }
        }
    }, [category])

    const setCategoryOptions = async () => {

        const setData = (catData) => {
            setCategories(catData);
        }
        const data = await getCategories();
        setData(data);
        setIsLoading(false)

    }

    const handleSubmit = (e) => {
        console.log(category, catId, queue, legend)
        if(!category || !catId || !queue || !legend){
            e.preventDefault();
            alert('Please fill out all fields')
            return;
        }else{
            addLegend(catId, queue, legend)
        }
    }

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
                    <label className="def-text label">Library</label>
                    <br/>
                    <DropDown 
                        options={categories}
                        choice={category}
                        setChoice={setCategory}
                    />
                    <br/>
                    {
                        newCat &&
                        <div>
                            <input 
                                id='category'
                                type='text'
                                placeholder="New category"
                                required
                                onChange={(e) => setCategory(e.currentTarget.value)}
                            />
                        </div>
                    }
                    <label className="def-text label">Queue</label>
                    <br/>
                    <input
                        id='queue'
                        type='text'
                        required
                        onChange={(e) => setQueue(e.currentTarget.value)}
                    />
                    <br/>
                    <label className="def-text label">Key</label>
                    <br/>
                    <textarea
                        id='legend'
                        type='text'
                        required
                        onChange={(e) => setLegend(e.currentTarget.value)}
                    />
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

export default LegendInput;