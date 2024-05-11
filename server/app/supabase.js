require('dotenv').config();
const supabase = require('@supabase/supabase-js');
const e = require('express');

const supabaseUrl = 'https://rxnkpotflictmuvqacys.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey)

//Update answer on database
const updateAnswer = async (req, res, next) => {
    const answer = {
        id: req.body.id,
        answer: req.body.answer,
        accuracy: req.body.accuracy
    }
    
    const {error} = await supabaseClient
        .from('legends')
        .update({
            answer: answer.answer,
            last_attempt_accuracy: answer.accuracy
        })
        .eq('id', answer.id)

    if(error){
        console.log(error)
        if(error.code === '23505'){
            res.status(409).json({error: 'Duplicate key violation'})
        }else if(error.code === '02000'){
            res.status(400).json({error: 'Updating non-existent row'})
        }else if(error.code === '42804'){
            res.status(400).json({error: 'Data type mismatch'})
        }else if(error) {
            res.status(500).json({error: 'Internal server error'})
        }
    }else{
        res.status(201).send()
    }

}

const updateAccuracy = async (req, res, next) => {
    const accuracy = {
        id: req.body.id,
        accuracy: req.body.accuracy
    }
    
    const {error} = await supabaseClient
        .from('legends')
        .update({
            last_attempt_accuracy: accuracy.accuracy
        })
        .eq('id', accuracy.id)

    if(error){
        console.log(error)
        if(error.code === '23505'){
            res.status(409).json({error: 'Duplicate key violation'})
        }else if(error.code === '02000'){
            res.status(400).json({error: 'Updating non-existent row'})
        }else if(error.code === '42804'){
            res.status(400).json({error: 'Data type mismatch'})
        }else if(error) {
            res.status(500).json({error: 'Internal server error'})
        }
    }else{
        res.status(201).send()
    }

}

//Add category to library
const addCategory = async (req, res, next) => {
    const category = {
       id: req.body.id,
        category: req.body.category
    }

    const {error} = await supabaseClient
        .from('categories')
        .insert([{
            id: category.id,
            category: category.category
        }])

    if(error){
        console.log(error)
        if(error.code === '23505'){
            res.status(409).json({error: 'Duplicate key violation'})
        }else if(error.code === '02000'){
            res.status(400).json({error: 'Updating non-existent row'})
        }else if(error.code === '42804'){
            res.status(400).json({error: 'Data type mismatch'})
        }else if(error) {
            res.status(500).json({error: 'Internal server error'})
        }
    }else{
        res.status(201).send()
    }
}

//Add legend to library
const addLegend = async (req, res, next) => {

    console.log('adding legend', req.body)
    
    const legend = {
        id: req.body.id,
        catId: req.body.catId,
        queue: req.body.queue,
        legend: req.body.legend
    }

    const {error} = await supabaseClient
        .from('legends')
        .insert([{
            id: legend.id,
            category_id: legend.catId,
            queue: legend.queue,
            legend: legend.legend
        }])

    if(error){
        console.log(error)
        if(error.code === '23505'){
            res.status(409).json({error: 'Unique id error'})
        }else if(error.code === '23502'){
            res.status(400).json({error: 'Not null violation'})
        }else if(error.code === '42804'){
            res.status(400).json({error: 'Data type mismatch'})
        }else if(error){
            res.status(500).json({error: 'Internal server error'})
        }
    }else{
        console.log('added leg to db')
        res.status(201).send()
    }

}

const updateLegend = async (req, res, next) => {

    console.log(req.body.legend, req.body.queue, req.params.id)

    const {data, error} = await supabaseClient
        .from('legends')
        .update({
            queue: req.body.queue,
            legend: req.body.legend
        })
        .eq('id', req.params.id)

    if(error){
        console.log(error)
        if(error.code === '23505'){
            res.status(409).json({error: 'Duplicate key violation'})
        }else if(error.code === '02000'){
            res.status(400).json({error: 'Updating non-existent row'})
        }else if(error.code === '42804'){
            res.status(400).json({error: 'Data type mismatch'})
        }else if(error) {
            res.status(500).json({error: `Internal server error, ${error}`})
        }
    }else{
        console.log('updated legend', data)
        res.status(201).send()
    }
}

//Update accuracy
    //current acc
    //overall acc


const getLegends = async (req, res, next) => {
    const catId = req.params.catId

    const {data, error} = await supabaseClient
        .from('legends')
        .select('id, legend, queue')
        .eq('category_id', catId)

    if(error){
        console.log('error', error)
        if(error.code === '42703'){
            res.status(409).json({error: 'Undefined column'})
        }else if(error.code === '42703'){
            res.status(400).json({error: 'Ambiguous column names in JOINs'})
        }else if(error.code === '42501'){
            res.status(400).json({error: 'Insufficient priviledge'})
        }else if(error){
            res.status(500).json({error: 'Internal server error'})
        }else{
            res.status(201).send(data); //check status code
        }
    }else{
        res.status(200).send(data)
    }
        
    }

const getCategories = async (req, res, next) => {

    const {data, error} = await supabaseClient
        .from('categories')
        .select('*')

        if(error){
            console.log('error', error)
            if(error.code === '42703'){
                res.status(409).json({error: 'Undefined column'})
            }else if(error.code === '42703'){
                res.status(400).json({error: 'Ambiguous column names in JOINs'})
            }else if(error.code === '42501'){
                res.status(400).json({error: 'Insufficient priviledge'})
            }else if(error){
                res.status(500).json({error: 'Internal server error'})
            }else{
                res.status(201).send(); //check status code
            }
        }else{
            res.status(200).send(data)
        }
}

module.exports = {
    updateAnswer,
    addCategory,
    addLegend,
    updateAccuracy,
    updateLegend,
    getCategories,
    getLegends
}