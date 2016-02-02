const RogainConfig = require('../dist').Config;

var config = new RogainConfig();

config
  .registerHelper('Range', require('./helpers/Range'))
  .registerHelper('Repeat', require('./helpers/Repeat'))
  .registerHelper('Pass', require('./helpers/Pass'))
  .registerHelper('Fail', require('./helpers/Fail'));

module.exports = config;