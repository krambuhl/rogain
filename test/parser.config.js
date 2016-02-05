const Config = require('rogain-config');

var config = new Config({
  helpers: require('./helpers/helpers.js')
});

module.exports = config;