import { v4 as uuid4 } from 'uuid';

export const API_ENDPOINT = process.env.NODE_ENV === 'production' ? 'https://memorizer.onrender.com' : 'http://localhost:4000';
//old 'https://memorizer-94a158ea50d7.herokuapp.com'

export const getCategories = async () => {

    const response = await fetch(`${API_ENDPOINT}/categories`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })

    const categories = await response.json();

    return categories
}

export const getLegends = async (catId) => {
    
    const response = await fetch(`${API_ENDPOINT}/legends/${catId}`, {
        method: "GET",
        headers:{
            "Content-Type": "application/json",
        }
    })

    const legends = await response.json();

    return legends;

}

export const updateAnswer = async (id, answer, acc) => {

    const response = await fetch(`${API_ENDPOINT}/answer`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: id,
            answer: answer,
            accuracy: acc
        })
    })

    const postAnswer = response.status;

    return postAnswer
}

export const addLegend = async (catId, queue, legend) => {
    const newId = uuid4();

    const response = await fetch(`${API_ENDPOINT}/add-legend`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: newId,
            catId: catId,
            queue: queue,
            legend: legend
        })
    })

    const legendRes = await response.status;

    return legendRes;
}

export const editLegend = async (id, queue, legend) => {

    const response = await fetch(`${API_ENDPOINT}/update-legend/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            queue,
            legend
        })

    })

    const updateRes = await response.status;

    return updateRes;
}