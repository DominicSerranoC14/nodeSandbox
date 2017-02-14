'use strict'

const express = require('express');
const app = express();


// Get port from environment and store in Express.
// If no process.env.PORT then port is 3000
const port = process.env.PORT || 3000;

// app.set = Sets a local port varible on app.locals
// These varibles can also be used as setting
app.set('port', port);
// pug configuration
app.set('view engine', 'pug');
// By default, node will look for partials in the 'views'
// This is how to change the path of views
app.set('views', `${__dirname}/partials`);

// Using local vars
// if (process.env.NODE_ENV !== 'production') {
//   app.locals.pretty = true
// }

// middlewares
// Serving up the public directory files for js and css
app.use(express.static('public'));

// routes
app.get('/', (req, res) => {
  // Can send json in render
  res.render('index', { pageName: 'Home' });
});

app.get('/about', (req, res) => {
  res.render('about', {pageName: 'About'});
});

// Listen to requests on the provided port and log when available
app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
});
