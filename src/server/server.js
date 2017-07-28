const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

let db,
  url = '/list',
  port = process.env.PORT || 8080,
  app = express();

MongoClient.connect('mongodb://ryzhik:ryzhik@ds125183.mlab.com:25183/todo-app', (err, database) => {
  if (err) return console.log(err);
  db = database;
  app.listen(port, () => {
    console.log('This express app is listening on port:' + port);
  });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.resolve(process.cwd(), '/')));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.set('port', port);

app.get(url, (req, res) => {
  db.collection('list').find().toArray((err, result) => {
    if (err) return console.log(err);
    res.json(result);
  })
});

app.post(url, (req, res) => {
  db.collection('list').save(req.body, (err, result) => {
    if (err) return console.log(err);
    res.json(result);
  });
});

app.delete(url + ':id', (req, res) => {
  db.collection('list').remove({_id: new ObjectID(req.params.id)}, (err, result) => {
    if (err) return res.send(500, err);
    res.json(result);
  })
});

app.put(url, (req, res) => {
  db.collection('list').findOneAndUpdate({_id: req.body._id}, req.body, (err, result) => {
    if (err) return console.error(err);
    res.json(result);
  });
});

