const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');
const suparouter = require('./suparoutes')
const path = require('path');
const logger = require('morgan');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '../.././client', 'build')));

//app.use('/', router);
app.use('/', suparouter);

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../.././client/build', 'index.html'))
})

app.use((err, req, res, next) => {
    if(err){
        res.status(400).json({error: err.code})
    }
})

app.listen(PORT, () => {
    console.log("App listening on port %i", PORT)
})
