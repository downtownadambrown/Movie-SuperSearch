// Express server and helper module initialization
const express = require('express');

const app = express();
const port = process.env.PORT || 5000;
const path = require('path');
const bunyan = require('express-bunyan-logger');
const env = process.env.NODE_ENV || 'dev';

// Configure Express to handle requests
app.use(bunyan.errorLogger());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Static file declaration
app.use(express.static(path.join(__dirname, 'client/build')));

// Import db routes
require('./db_routes')(app);

app.get('/', (req, res) => {
    res.sendfile(path.join(__dirname, 'client/build/index.html'));
});

// Listen on a port for requests
app.listen(port, () => console.log(`Listening on port ${port}`));
