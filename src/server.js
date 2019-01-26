const express = require('express');
const app = express();

const PORT = process.env.PORT || 3005;

// Sets up our server to parse our request body for usage
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// Import all routes
require('./routes/api-routes.js')(app);

// Starts our server on the predefined PORT
app.listen(PORT, function(){
    console.log(`App is now listening on PORT ${PORT}`)
});