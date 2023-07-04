// Declare Variables
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

//Connect Dependecies and Libraries 
const bodyParser = require('body-parser')
const cors = require('cors');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = process.env.PORT || 3000;
app.listen(port, listening);
function listening() {
    console.log('The server is running on http://localhost:' + port);
}

//GET Route
app.get('/weather', (req, res) => res.send(projectData));

//POST Route
app.post('/weather/save', (req, res) => {
    projectData.date = req.body.date;
    projectData.feelings = req.body.feelings;
    projectData.temp = req.body.main.temp;
    res.end();
});