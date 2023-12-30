const express = require('express');
const router = express.Router();
const queries = require('./queries');


router.get('/', (req, res, next) => {
    res.json({"info": "memorizer app"})
});

//Get all categories
router.get('/categories', queries.getCategories)

//Add legend to library
router.post('/legend', queries.addLegend)

//Get all legends
router.get('/legends/:catId', queries.getLegends)

//Update answer on data base
router.post('/answer', queries.updateAnswer)

//Add new category to database
router.post('/category', queries.addCategory)

//Update users last attempt accuracy
router.post('/accuracy', queries.updateAccuracy)

//Update legend
router.post('/legend/:id', queries.updateLegend)

module.exports = router;