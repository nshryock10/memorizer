const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');
const logger = require('morgan');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', router);

app.use((err, req, res, next) => {
    if(err){
        res.status(400).json({error: err.code})
    }
})

app.listen(PORT, () => {
    console.log("App listening on port %i", PORT)
})
