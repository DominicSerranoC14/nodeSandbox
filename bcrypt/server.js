'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'pug');
// A new body object containing the parsed data is populated on the request object after the middleware (i.e. req.body). This object will contain key-value pairs, where the value can be a string or array (when extended is false), or any type (when extended is true).
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/', ({body: {username, password}}, res) => {
  console.log(username, password);
  res.render('index');
})

app.listen(3000, () => console.log('Listening on port 3000'));
