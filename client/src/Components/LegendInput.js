import React, { useState } from "react";

function LegendInput () {

    const [queue, setQueue] = useState();
    const [category, setCategory] = useState();
    const [categories, setCategories] = useState()

    return(
        <div>
            <form>
                <label>Library</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.currentTarget.value)}
                >
                    <option
                        value='Select User'
                        key='A'
                        disabled
                    >
                        Select User
                    </option>
                    {
                        categories && 
                        categories.map( (option, index) => {
                            return(
                                <option
                                    key={index}
                                    value={option.category}
                                >
                                    {option.category}
                                </option>
                            )
                        })
                    }
               </select>
                <label>Queue</label>
                <br/>
                <input
                    id='queue'
                    type='text'
                    required
                    onChange={(e) => setQueue(e.currentTarget.value)}
                />
            </form>
        </div>
    )

}

export default LegendInput;