const RogainConfig = require('../dist').Config;

var config = new RogainConfig({
  helpers: require('./helpers/helpers.js')
});

module.exports = config;