const express = require('express');
const router = express.Router();
const queries = require('./queries');


router.get('/', (req, res, next) => {
    res.json({"info": "memorizer app"})
});

router.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../.././client/public', 'index.html'))
})

//Get all categories
router.get('/categories', queries.getCategories)

router.get('/legends/:catId', queries.getLegends)

//Update answer on data base
router.post('/answer', queries.updateAnswer)

//Add new category to database
router.post('/category', queries.addCategory)

//Add legend to library
router.post('/legend', queries.addLegend)

//Update users last attempt accuracy
router.post('/accuracy', queries.updateAccuracy)

//Update legend
router.post('/legend/:id', queries.updateLegend)

module.exports = router;