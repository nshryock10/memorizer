import React, { useState, useEffect} from "react";
import DropDown from "./DropDown";
import { getCategories, getLegends } from "../utils/api";
import Legend from "./Legend";
import './Library.css'

function Library () {

    const [categories, setCategories] = useState();
    const [category, setCategory] = useState('Select from drop down');
    const [catId, setCatId] = useState();
    const [isLoading, setIsLoading] = useState();
    const [legends, setLegends] = useState();
    const [legend, setLegend] = useState();
    const [legendId, setLegendId] = useState();
    const [queue, setQueue] = useState();
    const [open, setOpen] = useState(false);

    

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
        if(legendId){
            for(let i=0; i < legends.length; i++){
                if(legends[i].id === legendId){
                    setQueue(legends[i].queue)
                    setLegend(legends[i].legend)
                }
            }
        }
    }, [legendId])

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
        <div className="library-container">
            <DropDown 
                options={categories}
                choice={category}
                setChoice={setCategory}
            />
            {
                legends &&
                !open &&
                legends.map((legend, index) => {
                    return(
                        <button key={index} className="primary-button"
                            onClick={() => {
                                setOpen(!open)
                                setLegendId(legend.id)
                            }}
                        >
                            {legend.queue}
                        </button>
                    )
                })
            }
            {
                open &&
                <Legend 
                    open={open}
                    setOpen={setOpen}
                    catId={catId}
                    id={legendId}
                    queue={queue}
                    legend={legend}
                    category={category}
                />
            }
        </div>
    )
}

export default Library;