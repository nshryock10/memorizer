const express = require('express');
const router = express.Router();
const queries = require('./queries');


router.get('/', (req, res, next) => {
    res.json({"info": "memorizer app"})
});

//Get all categories
router.get('/categories', queries.getCategories)

router.get('/legends', queries.getLegends)

router.get('/queues', (req, res, next) => {
    res.status(200).json([{
        "id": 1,
        "queue": 'Faith',
        "legend": 'I have been crucified with Christ. It is no longer I who live, but Christ who lives in me. And the life I now live in the flesh I live by faith in the Son of God, who loved me and gave himself for me. Galatians 2:20',
        "category": 'mentor group'
     },
     {
        "id": 2,
        "queue": 'First',
        "legend": 'But seek first his kingdom and his righteousness',
        "category": 'mentor group'
     },
     {
        "id": 3,
        "queue": 'Abba Father',
        "legend": 'God sent the spirit of his son, the spirit that calls out Abba Father',
        "category": 'mentor group'
     }])
});

//Update answer on data base
router.post('/answer', queries.updateAnswer)

//Add new category to database
router.post('/category', queries.addCategory)

//Add legend to library
router.post('/legend', queries.addLegend)

//Update users last attempt accuracy
router.post('/accuracy', queries.updateAccuracy)

module.exports = router;