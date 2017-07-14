import express = require('express');
const path = require('path');
import bodyParser from 'body-parser';
import {itemsAPI} from './api/items';
import {MongoStart} from './createDB';

var port: number = process.env.PORT || 4200;
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.resolve(process.cwd(), 'app/')));

app.get('/*', (req, res) => res.sendFile(path.resolve(process.cwd(), 'app/index.html')));

app.set('port', port);

itemsAPI(app);

var mongoStart = new MongoStart();

var server = app.listen(port, () => {
  var port = server.address().port;
  console.log('This express app is listening on port:' + port);
});
