// Express server and helper module initialization
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
const bunyan = require('express-bunyan-logger');

// Configure Express to use jade/pug
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');

// Configure Express to handle requests
app.use(bunyan.errorLogger());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, './client/public')));

// Import all routes
require('./routes')(app);

// Listen on a port for requests
app.listen(port, () => console.log(`Listening on port ${port}`));