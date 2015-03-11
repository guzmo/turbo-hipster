'use strict';
var request = require('request');
var assign = require("react/lib/Object.assign");
var state = require('../state');

const ENDPOINT = location.protocol + '//' + location.host + '/api/buildqueue';

exports.getBuilds = function () {
  return new Promise(function (resolve, reject) {
    request({method: 'GET', url: ENDPOINT, json: true}, (err, res, body) => {
      if (err) {
        return reject(err);
      }
      state.set('builds', body);
      return resolve(body);
    });
  });
};

exports.replayBuild = function (build) {
  build = assign({}, build);
  delete build._id;
  build.isSuccessful = false;
  build.message = null;
  build.nrOfAttempts = 0;
  build.createdAt = new Date();
  build.buildAt = null;
  return new Promise(function (resolve, reject) {
    request({method: 'POST', url: ENDPOINT, json: build}, (err, res, body) => {
      if (err) {
        return reject(err);
      }
      state.select('builds').push(body);
      return resolve(body);
    });
  });
};
