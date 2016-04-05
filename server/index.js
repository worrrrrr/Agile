var express = require('express');
var app = express();
var server = require('http').Server(app);
var bodyParser = require('body-parser');

var users = require('./users') 
var tasks = require('./tasks') 
var projects = require('./projects')


/*var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';*/

//var mongojs = require('mongojs')
//var db = mongojs(connectionString, ['task'])

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8100");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
    res.header("Content-Type", "application/x-www-form-urlencoded");
    next();
});

app.get('/', function (req, res) {
    res.send('<h1>Hello Node.js</h1> lolsda');
});
 
app.get('/api/users', function (req, res) {
    res.json(users.findAll());
});
 
app.get('/api/user/:id', function (req, res) {
    var id = req.params.id;
    res.json(users.findById(id));
});
 
app.post('/api/newuser', function (req, res) {
    var json = req.body;
    res.send('Add new ' + json.name + ' Completed!');
});


//-------------------------------task  API --------------------------------//

app.get('/api/tasks', function (req, res) {
    res.json(tasks.findAll());
});
 
app.get('/api/tasks/:id', function (req, res) {
    var id = req.params.id;
    res.json(tasks.findById(id));
});
 
app.post('/api/newtask', function (req, res) {
    var json = req.body;
    res.send('Add new ' + json.name + ' Completed!');
});


//-------------------------------Project  API --------------------------------//

app.get('/api/projects', function (req, res) {
    res.json(projects.findAll());
});
 
app.get('/api/projects/:id', function (req, res) {
    var id = req.params.id;
    res.json(projects.findById(id));
});
 
app.post('/api/newproject', function (req, res) {
    var json = req.body;
    res.send('Add new ' + json.name + ' Completed!');
});



/* สั่งให้ server ทำการรัน Web Server ด้วย port ที่เรากำหนด */

server.listen(8000, function(){
  console.log("server on");
})