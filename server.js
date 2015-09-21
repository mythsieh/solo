// server.js

// Required Packages
// ================================================================================================
var express = require('express');   // require express module
var app = express();                // defines app using express
// body-parser takes the body of the request and parses it to whatever you 
// want your server to receive in POST/PUT requests (JSON, URL encoded, text, raw).
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// set port
var port = process.env.PORT || 3000; 

// routes for the API
// ================================================================================================
var router = express.Router();      // sets up an instance of the express router
router.get('/', function(req, res){
  res.end('hellohellohelloworldworldworld');
})

app.use('/api', router);


//START SERVER
// ================================================================================================
app.listen(port);
console.log("Current listening on " + port);