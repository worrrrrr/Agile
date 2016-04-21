var express = require('express');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');


var app = express();
var server = require('http').Server(app);


var users = require('./users') 
var tasks = require('./tasks') 
var projects = require('./projects')

var connectionString = 'mongodb://localhost:27017/agileDB'
/*var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';*/


//var db = mongojs('Agile')
var db = mongojs(connectionString, ['tasks','projects','users']);


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
    //res.json(users.findAll());
    db.users.find({},function(err,docs){
        res.json(docs);
        //console.log(docs);
    })
});

app.post('/api/users', function (req, res) {
    //res.json(users.findAll());
    console.log(req.body.username)
    db.users.findOne({username:req.body.username},function(err,docs){
        res.json(docs.id);
        console.log(docs);
    })
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
    //res.json(tasks.findAll());
    db.tasks.find(function(err,docs){ 
        res.json(docs);
        //console.log(docs);
    })
});

app.get('/api/searchTask', function (req, res) {
    //console.log(req.query.data);
    res.json(tasks.wherePid(req.query.data));
});

app.get('/api/tasks/:id', function (req, res) {
    var id = req.params.id;
    console.log(req.params.id);
    res.json(tasks.findById(id));
});
 
app.post('/api/newtask', function (req, res) {
    var json = req.body;
    res.send('Add new ' + json.name + ' Completed!');
});


//-------------------------------Project  API --------------------------------//

app.get('/api/projects', function (req, res) {
     db.projects.find(function(err,docs){ 
        res.json(docs);
        console.log(docs)
    })
});

app.post('/api/projects', function (req, res) {
    console.log(req.body.id)
      db.projects.find({teamDev:req.body.id},function(err,docs){ 
        res.json(docs);
        //console.log(docs)
    })
});
 
app.get('/api/projects/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);

   /* db.projects.aggregate([{$match:{"id":id}},{$lookup:{from:"tasks",localField:"id",foreignField:"pid",as:"task_docs"}}],function(err,docs){
        console.log(docs)
        res.send('Success')
    })*/
});
 
app.post('/api/newproject', function (req, res) {
    var json = req.body;
    res.send('Add new ' + json.name + ' Completed!');
});

app.post('/api/projects/tasks', function (req, res) {
    //console.log(req.body);
    db.projects.aggregate([{$match:{id:req.body.id}},{$lookup:{from:"tasks",localField:"id",foreignField:"pid",as:"task_docs"}}],function(err,docs){
        //console.log(docs[0].task_docs)
        res.send(docs[0].task_docs)
    })
});

/* สั่งให้ server ทำการรัน Web Server ด้วย port ที่เรากำหนด */

server.listen(8000, function(){
  console.log("server on");
})






