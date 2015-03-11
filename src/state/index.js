'use strict';
var Baobab = require('baobab');

var state = new Baobab({
  selectedBuildId: null,
  builds: []
});

module.exports = state;
