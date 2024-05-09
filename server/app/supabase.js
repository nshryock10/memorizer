const db = require('./index');
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rxnkpotflictmuvqacys.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

//Update answer on database
const updateAnswer = async (req, res, next) => {
    const answer = {
        id: req.body.id,
        answer: req.body.answer,
        accuracy: req.body.accuracy
    }
    
    const {error} = await supabase
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
    }

    res.status(201).send()

}

const updateAccuracy = (req, res, next) => {
    const accuracy = {
        id: req.body.id,
        accuracy: req.body.accuracy
    }
    
    //Update last_attempt_accuracy from table
    db.query('UPDATE legends SET last_attempt_accuracy=$1 WHERE id=$2',
    [accuracy.accuracy, accuracy.id],
    (err, result) => {
        if(err){
            if(err.code === '23505'){
                res.status(409).json({error: 'Duplicate key violation'})
            }else if(err.code === '02000'){
                res.status(400).json({error: 'Updating non-existent row'})
            }else if(err.code === '42804'){
                res.status(400).json({error: 'Data type mismatch'})
            }else if(err) {
                res.status(500).json({error: `Internal server error, ${err}`})
            }
        }else if(result.rowCount === 0){
            res.status(400).json({error: 'Updating non-existent row'})
        }else{
            res.status(201).send()
        }
    })
}

//Add category to library
const addCategory = async (req, res, next) => {
    const category = {
       id: req.body.id,
        category: req.body.category
    }

    db.query('INSERT INTO categories (id, category) VALUES ($1, $2)',
        [category.id, category.category],
        (err, result) => {

        if(err){
            console.log(err)
            if(err.code === '23505'){
                res.status(409).json({error: 'Duplicate key violation'})
            }else if(err.code === '23502'){
                res.status(400).json({error: 'Not null violation'})
            }else if(err.code === '42804'){
                res.status(400).json({error: 'Data type mismatch'})
            }else if(err){
                res.status(500).json({error: 'Internal server error'})
            }
        }else{
            res.status(201).send()
        }
    })
}

//Add legend to library
const addLegend = async (req, res, next) => {

    console.log(req.body)
    
    const legend = {
        id: req.body.id,
        catId: req.body.catId,
        queue: req.body.queue,
        legend: req.body.legend
    }

     db.query('INSERT INTO legends (id, category_id, queue, legend) VALUES ($1, $2, $3, $4)',
        [legend.id, legend.catId, legend.queue, legend.legend], (err, result) => {

            if(err){
                if(err.code === '23505'){
                    res.status(409).json({error: 'Unique id error'})
                }else if(err.code === '23502'){
                    res.status(400).json({error: 'Not null violation'})
                }else if(err.code === '42804'){
                    res.status(400).json({error: 'Data type mismatch'})
                }else if(err){
                    res.status(500).json({error: 'Internal server error'})
                }
            }else{
                console.log('added leg to db')
                res.status(201).send()
            }

        })
}

const updateLegend = async (req, res, next) => {

    console.log(req.body.legend, req.body.queue, req.params.id)
    db.query('UPDATE legends SET legend=$1, queue=$2 WHERE id=$3',
    [req.body.legend, req.body.queue, req.params.id],
    (err, result) => {
        if(err){
            if(err.code === '23505'){
                res.status(409).json({error: 'Duplicate key violation'})
            }else if(err.code === '02000'){
                res.status(400).json({error: 'Updating non-existent row'})
            }else if(err.code === '42804'){
                res.status(400).json({error: 'Data type mismatch'})
            }else if(err) {
                res.status(500).json({error: `Internal server error, ${err}`})
            }
        }else if(result.rowCount === 0){
            res.status(400).json({error: 'Updating non-existent row'})
        }else{
            res.status(201).send()
        }
    })

}

//Update accuracy
    //current acc
    //overall acc


const getLegends = async (req, res, next) => {
    const catId = req.params.catId

    console.log(`Getting legends with id ${catId}`)
    
    db.query('SELECT id, queue, legend FROM legends WHERE category_id=$1',[catId], (err, result) => {
        if(err){
            if(err.code === '42703'){
                res.status(409).json({error: 'Undefined column'})
            }else if(err.code === '42703'){
                res.status(400).json({error: 'Ambiguous column names in JOINs'})
            }else if(err.code === '42501'){
                res.status(400).json({error: 'Insufficient priviledge'})
            }else if(err){
                res.status(500).json({error: 'Internal server error'})
            }else{
                res.status(201).send(); //check status code
            }
        }else{
            res.status(200).send(result.rows)
        }
    })
        
    }

const getCategories = async (req, res, next) => {

    db.query('SELECT * FROM categories', (err, result) => {

        if(err){
            if(err.code === '42703'){
                res.status(409).json({error: 'Undefined column'})
            }else if(err.code === '42703'){
                res.status(400).json({error: 'Ambiguous column names in JOINs'})
            }else if(err.code === '42501'){
                res.status(400).json({error: 'Insufficient priviledge'})
            }else if(err){
                res.status(500).json({error: 'Internal server error'})
            }else{
                res.status(201).send(); //check status code
            }
        }else{
            res.status(200).send(result.rows)
        }

    })
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