'use strict';

const express = require('express');
const app = express();

app.get('/', function(req, res){
    res.send('hello ROOT world');
});

app.get('/stubbed', function(req, res){
    res.send('hello STUBBED');
});

app.get('/testing', function(req, res){
    res.send('this is a test endpoint');
});

app.get('/jsonendpoint', function(req, res){
    res.json({
        "mykey" : "myvalue",
        "testy" : "something",
        "exnum" : 123
    });
});

app.listen(3000, () => console.log('Listening on port 3000'));
