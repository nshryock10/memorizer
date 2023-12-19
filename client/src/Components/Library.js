import React, { useState, useEffect} from "react";
import DropDown from "./DropDown";
import { getCategories, getLegends } from "../utils/api";

function Library () {

    const [categories, setCategories] = useState();
    const [category, setCategory] = useState('Select from drop down');
    const [catId, setCatId] = useState();
    const [isLoading, setIsLoading] = useState();
    const [legends, setLegends] = useState()

    

    const setCategoryOptions = async () => {

        const setData = (catData) => {
            setCategories(catData);
        }
        const data = await getCategories();
        setData(data);
        setIsLoading(false)

    }

    const getLegendCards = async () => {

        const setCardArry = (data) => {
            const cardData = data;
            setLegends(cardData);
        }

        const cardArry = await getLegends(catId); //getQueues()
        setCardArry(cardArry);
        setIsLoading(false);
    }

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

    useEffect(() => {
        if(catId){
            getLegendCards();
        }
    },[catId])

    return (
        <div>
            <DropDown 
                options={categories}
                choice={category}
                setChoice={setCategory}
            />
            {
                legends &&
                legends.map((legend, index) => {
                    return(
                        <button key={index} className="primary-button">
                            {legend.queue}
                        </button>
                    )
                })
            }
        </div>
    )
}

export default Library;