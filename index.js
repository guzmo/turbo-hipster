'use strict';
var path = require('path');
var http = require('http');
var express = require('express');
var compression = require('compression');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;

var builds;

app.use(compression());

app.use(express.static(path.join(__dirname, 'public')));

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  builds = [
    {"_id":"54fdb90c6e5beb170090bc8a","fullName":"Softhouse/laughing-batman","name":"laughing-batman","repo":"https://github.com/Softhouse/laughing-batman.git","commit":"7eea35965dfa15ca6abb09a956986ce0e70da2ed","endpoint":"api","createdAt":"2015-03-09T15:15:24.027Z","buildAt":"2015-03-09T15:18:34.061Z","nrOfAttempts":1,"isSuccessful":false,"message":"The shit hit the fan\neverything is down...","pusher":{"name":"joakimbeng","email":"joakim@klei.se"}},
    {"_id":"54fdb9ee07024c17005efc3c","fullName":"Softhouse/massive-ninja","name":"massive-ninja","repo":"https://github.com/Softhouse/massive-ninja.git","commit":"71436a858ec47e3f8398bd054d600bfcadbad897","endpoint":null,"createdAt":"2015-03-09T15:19:10.272Z","buildAt":"2015-03-09T15:19:16.882Z","nrOfAttempts":1,"isSuccessful":true,"message":null,"pusher":{"name":"joakimbeng","email":"joakim@klei.se"}}
  ];

  app.use(bodyParser.json());

  app.use(express.static(path.join(__dirname, 'src')));

  app.get('/api/buildqueue', function (req, res) {
    res.status(200).send(builds);
  });

  app.post('/api/buildqueue', function (req, res) {
    builds.push(req.body);
    req.body._id = +new Date();
    res.status(201).send(req.body);
  });
}

http.createServer(app).listen(port, function () {
  console.log('Static file server listening on port ' + port);
});
