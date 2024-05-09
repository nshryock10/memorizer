const express = require('express');
const suparouter = express.Router();
const supabase = require('./supabase');

suparouter.get('/', (req, res, next) => {
    res.json({"info": "memorizer app"})
});

//Get all categories
suparouter.get('/categories', supabase.getCategories)

//Add legend to library
suparouter.post('/add-legend', supabase.addLegend)

//Get all legends
suparouter.get('/legends/:catId', supabase.getLegends)

//Update answer on data base
suparouter.post('/answer', supabase.updateAnswer)

//Add new category to database
suparouter.post('/category', supabase.addCategory)

//Update users last attempt accuracy
suparouter.post('/accuracy', supabase.updateAccuracy)

//Update legend
suparouter.post('/update-legend/:id', supabase.updateLegend)

module.exports = suparouter;