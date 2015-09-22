// server.js

// Required Packages
// ================================================================================================
var express = require('express');   // require express module
var app = express();                // defines app using express
// body-parser takes the body of the request and parses it to whatever you 
// want your server to receive in POST/PUT requests (JSON, URL encoded, text, raw).
var bodyParser = require('body-parser');
var path = require('path');
var Task = require('./client/models/task');


var mongoose = require('mongoose');

// to host locally, db_name will automatically be created
// mongoose.connect('mongodb://localhost/db_name');
// MONGOLAB_URI: mongodb://heroku_hvfg67r8:p86akge5u56ktlk93g4nknk0fr@ds051843.mongolab.com:51843/heroku_hvfg67r8

// var mongoURI = process.env.CUSTOMCONNSTR_MONGOLAB_URI || 'mongodb://localhost/weekliesdb';
var mongoURI = 'mongodb://heroku_hvfg67r8:p86akge5u56ktlk93g4nknk0fr@ds051843.mongolab.com:51843/heroku_hvfg67r8' || 'mongodb://localhost/weekliesdb';

//connect to database
mongoose.connect(mongoURI);


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// this allows us to serve static files from the client folder as the pathway
app.use(express.static('client'));

// set port
var port = process.env.PORT || 3000; 

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/client/index.html'));
});

// routes for the API
// ================================================================================================
var router = express.Router();      // sets up an instance of the express router
// http://127.0.0.1:3000/api
app.use('/api', router);

router.get('/', function(req, res){
  res.end('hellohellohelloworldworldworld');
});

// get all tasks
router.get('/tasks', function(req, res){
  //use mongoose to get all tasks in the database
  Task.find(function(err, tasks){
    if (err) {
      res.send(err);
    }
    res.json(tasks);
  })
});

//create a task
router.post('/tasks', function(req, res){
  // Create a task, information comes from AJAX request from Angular
  Task.create({
    name: req.body.name,
    sunday: 0,
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    saturday: 0,
    done: false
  }, function(err, task){
    if (err) {
      res.send(err);
    }
    // get and return all the tasks after you create another
    Task.find(function(err, tasks){
      if (err) {
        res.send(err);
      }
      res.json(tasks);
    })
  })
});

//delete a task
// router.delete('/tasks/:task_id', function(req, res){
router.delete('/tasks/:task_id', function(req, res){
  var taskID = req.url.slice(7);
  console.log(taskID);
  Task.remove({
    _id: taskID
    }, function (err, task){
      if (err){
        res.send(err);
      }
      Task.find(function(err, tasks){
        if (err){
          res.send(err);
        }
        res.json(tasks);
      });
    });
  // Task.remove({
  //   _id: req.params.todo_id
  // }, function(err, task){
  //   if (err) {
  //     res.send(err);
  //   }
  //   // get and return all the tasks after you create another
  //   Task.find(function(err, tasks){
  //     if (err){
  //       res.send(err);
  //     }
  //     res.json(todos);
  //   })
  // })
  // res.end();
})

//I need to add an update here later

router.put('/tasks', function(req, res){
  Task.findOneAndUpdate({_id: req.body._id}, req.body, function(err, task){
    if (err) {
      res.send(err);
    }
    Task.find(function(err, tasks){
      if (err) {
        res.send(err);
      }
      res.json(tasks);
    })
  })
})

//Clear all tasks button



//START SERVER
// ================================================================================================
app.listen(port);
console.log("Current listening on " + port);




















