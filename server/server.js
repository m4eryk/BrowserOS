const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 3000;
const api = require('./routes/api')
const app =  express();

app.use(cors());

app.use(bodyParser.text());
app.use('/api', api);


app.get('/', (req, res)=>{
    res.send('helo from server')
})

app.listen(PORT, ()=>{
    console.log('server running on localhost:' + PORT)
})